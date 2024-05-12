import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-04-10",
});

export async function POST(req: Request, res: Response) {
    const user = await currentUser();

    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();

    const { booking, payment_intent_id } = body;
    console.log(user.emailAddresses[0].emailAddress);
    const bookingData = {
        ...booking,
        username: user.firstName,
        userEmail: user.emailAddresses[0].emailAddress,
        userId: user.id,
        currency: "usd",
        paymentIntentId: payment_intent_id,
    };

    console.log(bookingData);

    let foundBooking;
    if (payment_intent_id) {
        foundBooking = await prismadb.booking.findUnique({
            where: {
                paymentIntentId: payment_intent_id,
                userId: user.id,
            },
        });
    }
    console.log(foundBooking);
    console.log(payment_intent_id);
    if (foundBooking && payment_intent_id) {
        console.log("update payment");
        const current_intent = await stripe.paymentIntents.retrieve(
            payment_intent_id
        );
        if (current_intent) {
            const update_intent = await stripe.paymentIntents.update(
                payment_intent_id,
                {
                    amount: booking.price * 100,
                }
            );

            const res = await prismadb.booking.update({
                where: {
                    paymentIntentId: payment_intent_id,
                    userId: user.id,
                },
                data: bookingData,
            });
            if (!res) {
                return NextResponse.error();
            }
            return NextResponse.json({ paymentIntent: update_intent });
        }
    } else {
        console.log("create payment");
        const paymentIntent = await stripe.paymentIntents.create({
            amount: bookingData.price * 100,
            currency: bookingData.currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });
        bookingData.paymentIntentId = paymentIntent.id;

        await prismadb.booking.create({
            data: bookingData,
        });

        return NextResponse.json({ paymentIntent });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
}
