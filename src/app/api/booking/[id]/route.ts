import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = auth();
        if (!params.id) {
            return new NextResponse("Payment Intent Id is required", {
                status: 400,
            });
        }
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const booking = await prismadb.booking.update({
            where: {
                paymentIntentId: params.id,
            },
            data: {
                paymentStatus: true,
            },
        });
        return NextResponse.json(booking);
    } catch (e) {
        console.log("Error at /api/booking/id Patch: ", e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.id) {
            return new NextResponse("Payment Intent Id is required", {
                status: 400,
            });
        }

        const booking = await prismadb.booking.delete({
            where: { id: params.id },
        });

        return NextResponse.json(booking);
    } catch (e) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.id) {
            return new NextResponse("Hotel Id is required", {
                status: 400,
            });
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const booking = await prismadb.booking.findMany({
            where: {
                roomId: params.id,
                checkOut: { gte: yesterday },
                paymentStatus: true,
            },
        });

        return NextResponse.json(booking);
    } catch (e) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
