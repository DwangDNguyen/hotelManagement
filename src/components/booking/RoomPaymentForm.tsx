import useBookRoom from "@/hooks/useBookRoom";
import {
    AddressElement,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { Separator } from "../ui/separator";
import moment from "moment";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Booking } from "@prisma/client";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";
interface RoomPaymentFormProps {
    handleSetPaymentSuccess: (value: boolean) => void;
    clientSecret: string;
}

type DateRangesType = {
    checkIn: Date;
    checkOut: Date;
};

function hasOverlap(
    checkIn: Date,
    checkOut: Date,
    dateRanges: DateRangesType[]
) {
    const targetInterval = {
        start: startOfDay(new Date(checkIn)),
        end: endOfDay(new Date(checkOut)),
    };
    for (const range of dateRanges) {
        const rangeStart = startOfDay(new Date(range.checkIn));
        const rangeEnd = endOfDay(new Date(range.checkOut));

        if (
            isWithinInterval(targetInterval.start, {
                start: rangeStart,
                end: rangeEnd,
            }) ||
            isWithinInterval(targetInterval.end, {
                start: rangeStart,
                end: rangeEnd,
            }) ||
            (targetInterval.start < rangeStart && targetInterval.end > rangeEnd)
        ) {
            return true;
        }
    }
    return false;
}

const RoomPaymentForm = ({
    handleSetPaymentSuccess,
    clientSecret,
}: RoomPaymentFormProps) => {
    const { bookingRoomData, resetBookRoom } = useBookRoom();
    const stripe = useStripe();
    const elements = useElements();
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }
        if (!clientSecret) {
            return;
        }
        handleSetPaymentSuccess(false);
        setIsLoading(false);
    }, [stripe]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements || !bookingRoomData) {
            return;
        }

        try {
            const bookings = await axios.get(
                `/api/booking/${bookingRoomData.room.id}`
            );
            console.log("bookings:" + bookings.data);
            const roomBookingDates = bookings.data.map((booking: Booking) => {
                return {
                    checkIn: booking.checkIn,
                    checkOut: booking.checkOut,
                };
            });

            const overlapFound = hasOverlap(
                bookingRoomData.checkIn,
                bookingRoomData.checkOut,
                roomBookingDates
            );
            if (overlapFound) {
                setIsLoading(false);
                return toast({
                    variant: "error",
                    description:
                        "Some of the days you are trying to book have already been reserved. Please go back and select different dates of rooms",
                });
            }
            stripe
                .confirmPayment({
                    elements,
                    redirect: "if_required",
                })
                .then((result) => {
                    if (!result.error) {
                        axios
                            .patch(`/api/booking/${result.paymentIntent.id}`)
                            .then((res) => {
                                toast({
                                    variant: "success",
                                    description: `Payment successful 🎉🎉`,
                                });
                                router.refresh();
                                resetBookRoom();
                                handleSetPaymentSuccess(true);
                                setIsLoading(false);
                            })
                            .catch((err) => {
                                console.log(err);
                                toast({
                                    variant: "error",
                                    description: "Something went wrong",
                                });
                                setIsLoading(false);
                            });
                    }
                });
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    if (!bookingRoomData?.checkIn || !bookingRoomData?.checkOut) {
        return <div>Error: Missing reservation date!!!</div>;
    }

    const startDate = moment(bookingRoomData?.checkIn).format("MMMM Do YYYY");
    const endDate = moment(bookingRoomData?.checkOut).format("MMMM Do YYYY");

    return (
        <form onSubmit={handleSubmit} id="payment-form">
            <h2 className="font-semibold mb-2 text-lg">Billing Address</h2>
            <AddressElement
                options={{ mode: "billing", allowedCountries: ["US", "VN"] }}
            />
            <h2 className="font-semibold mb-2 text-lg">Payment Information</h2>
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            <div className="flex flex-col gap-1 mt-2">
                <Separator />
                <div className="flex flex-col gap-1 mb-2">
                    <h2 className="font-semibold mb-1 text-lg">
                        Your Booking Summary
                    </h2>
                    <div>You will check-in on {startDate} at 5PM</div>
                    <div>You will check-out on {endDate} at 5PM</div>
                </div>
                <Separator />
                <div className="font-bold text-lg">
                    Total Price: ${bookingRoomData?.price}
                </div>
            </div>
            <Button disabled={isLoading} className="bg-main hover:bg-main/90">
                {isLoading ? "Processing Payment..." : "Pay Now"}
            </Button>
        </form>
    );
};

export default RoomPaymentForm;
