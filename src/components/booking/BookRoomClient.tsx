"use client";
import React, { useEffect, useState } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useBookRoom from "@/hooks/useBookRoom";
import RoomCard from "@/components/room/RoomCard";
import RoomPaymentForm from "./RoomPaymentForm";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const BookRoomClient = () => {
    const { bookingRoomData, clientSecret } = useBookRoom();
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [pageLoaded, setPageLoaded] = useState(false);
    const router = useRouter();
    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: "stripe",
            labels: "floating",
        },
    };

    useEffect(() => {
        setPageLoaded(true);
    }, []);

    const handleSetPaymentSuccess = (value: boolean) => {
        setPaymentSuccess(value);
    };

    if (pageLoaded && !paymentSuccess && (!bookingRoomData || !clientSecret)) {
        return (
            <div className="flex items-center flex-col gap-4">
                <h2 className="text-[#ff2323] font-barlow text-5xl">
                    Oops! This page could not be propery loaded...
                </h2>
                <div>
                    <Button variant="outline" onClick={() => router.push("/")}>
                        Go Home
                    </Button>
                    <Button onClick={() => router.push("/my-bookings")}>
                        View My Bookings
                    </Button>
                </div>
            </div>
        );
    }

    if (paymentSuccess)
        return (
            <div className="flex flex-col items-center justify-center gap-4 my-20 min-h-[50vh]">
                <div className="text-main font-barlow font-bold text-5xl mb-5">
                    Payment Success!!! ✨✨✨
                </div>
                <Button
                    className="bg-main hover:bg-main/90"
                    onClick={() => router.push("/")}
                >
                    View Booking
                </Button>
            </div>
        );

    return (
        <div className="max-w-[1920px] w-full mx-auto py-[20px] xl:px-20  my-0">
            {clientSecret && bookingRoomData && (
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold">
                        Complete payment to reserve this room
                    </h3>
                    <div className="flex gap-20">
                        <div className="flex-[2]">
                            <Elements stripe={stripePromise} options={options}>
                                <RoomPaymentForm
                                    handleSetPaymentSuccess={
                                        handleSetPaymentSuccess
                                    }
                                    clientSecret={clientSecret}
                                />
                            </Elements>
                        </div>
                        <div className=" flex-1 mb-6">
                            <RoomCard room={bookingRoomData.room} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookRoomClient;
