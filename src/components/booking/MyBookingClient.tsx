"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Booking, Hotel, HotelImages, Room } from "@prisma/client";
import Image from "next/image";
import Amentity from "../Amentity";
import {
    AirVentIcon,
    Bath,
    Bed,
    Castle,
    Home,
    Loader2,
    Locate,
    MapPin,
    Mountain,
    Plus,
    Ship,
    SoupIcon,
    Speaker,
    SquarePen,
    Trash,
    Trees,
    Tv,
    User,
    UtensilsCrossed,
    Wifi,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

import axios from "axios";
import { useToast } from "../ui/use-toast";

import { DateRange } from "react-day-picker";
import { addDays, differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { auth, useAuth } from "@clerk/nextjs";
import useBookRoom from "@/hooks/useBookRoom";
import useLocation from "@/hooks/useLocation";
import moment from "moment";

interface MyBookingClientProps {
    booking: Booking & { room: Room | null } & { hotel: Hotel | null };
}

const MyBookingClient: React.FC<MyBookingClientProps> = ({
    booking,
}: MyBookingClientProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [bookingIsLoading, setBookingIsLoading] = useState(false);
    const { getCountryByCode, getStateByCode } = useLocation();
    const { room, hotel } = booking;
    const {
        setRoomData,
        paymentIntentId,
        setClientSecret,
        setPaymentIntentId,
    } = useBookRoom();
    const { userId } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    if (!hotel || !room) return <div>Missing Booking...</div>;

    const country = getCountryByCode(hotel.country);

    const checkIn = moment(booking.checkIn).format("MMMM Do YYYY");
    const checkOut = moment(booking.checkOut).format("MMMM Do YYYY");

    const dayCount = differenceInCalendarDays(
        booking.checkOut,
        booking.checkIn
    );

    const handleBookRoom = async () => {
        setBookingIsLoading(true);
        if (!userId) {
            toast({
                variant: "error",
                description: "Please login to book a room",
            });
            setBookingIsLoading(false);
        }
        if (!hotel?.userId) {
            toast({
                variant: "error",
                description:
                    "Something went wrong, refresh the page and try again",
            });
            setBookingIsLoading(false);
        }

        setBookingIsLoading(true);
        const bookingRoomData = {
            room,
            price: booking.price,
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
        };

        setRoomData(bookingRoomData);

        await axios
            .post(
                "/api/create-payment-intent",
                JSON.stringify({
                    booking: {
                        hotelOwnerId: hotel?.userId,
                        hotelId: hotel?.id,
                        roomId: room.id,
                        checkIn: bookingRoomData.checkIn,
                        checkOut: bookingRoomData.checkOut,
                        price: booking.price,
                    },
                    payment_intent_id: paymentIntentId,
                })
            )
            .then((res) => {
                setBookingIsLoading(false);
                if (res.status === 401) {
                    return router.push("/login");
                }
                return res.data;
            })
            .then((data) => {
                console.log(data);
                setClientSecret(data.paymentIntent.client_secret);
                setPaymentIntentId(data.paymentIntent.id);
                router.push("/book-room");
            });
    };

    return (
        <Card className="font-barlow">
            <CardHeader>
                <CardTitle className="line-clamp-2 leading-[1.8rem] h-[3.6rem]">
                    {hotel.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {hotel.country}, {hotel.state}, {hotel.city}
                </CardDescription>
                <Separator />
                <CardTitle className="line-clamp-2 mt-3 leading-[1.8rem] h-[3.6rem]">
                    {room.title}
                </CardTitle>
                <CardDescription className="line-clamp-4">
                    {room.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="aspect-square overflow-hidden relative h-[200px] rounded-lg">
                    <Image
                        fill
                        src={room.image}
                        alt={room.title}
                        className="object-cover"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 content-start text-sm">
                    <Amentity>
                        <Bed className="w-4 h-4" />
                        {room.bedCount} Bed{room.bedCount > 1 ? "s" : ""}
                    </Amentity>
                    <Amentity>
                        <User className="w-4 h-4" />
                        {room.guestCount} Guest{room.guestCount > 1 ? "s" : ""}
                    </Amentity>
                    <Amentity>
                        <Bath className="w-4 h-4" />
                        {room.bathroomCount} Bathroom
                        {room.bathroomCount > 1 ? "s" : ""}
                    </Amentity>
                    {room.roomService && (
                        <Amentity>
                            <UtensilsCrossed className="w-4 h-4" /> Room Service
                        </Amentity>
                    )}
                    {room.TV && (
                        <Amentity>
                            <Tv className="w-4 h-4" /> TV
                        </Amentity>
                    )}
                    {room.balcony && (
                        <Amentity>
                            <Home className="w-4 h-4" /> Balcony
                        </Amentity>
                    )}
                    {room.freeWifi && (
                        <Amentity>
                            <Wifi className="w-4 h-4" /> Free Wifi
                        </Amentity>
                    )}
                    {room.cityView && (
                        <Amentity>
                            <Castle className="w-4 h-4" /> City View
                        </Amentity>
                    )}
                    {room.oceanView && (
                        <Amentity>
                            <Ship className="w-4 h-4" /> Ocean View
                        </Amentity>
                    )}
                    {room.forestView && (
                        <Amentity>
                            <Trees className="w-4 h-4" /> Forest View
                        </Amentity>
                    )}
                    {room.mountainView && (
                        <Amentity>
                            <Mountain className="w-4 h-4" /> Mountain View
                        </Amentity>
                    )}
                    {room.airCondition && (
                        <Amentity>
                            <AirVentIcon className="w-4 h-4" /> Air Condition
                        </Amentity>
                    )}
                    {room.soundProofed && (
                        <Amentity>
                            <Speaker className="w-4 h-4" /> Sound Proofed
                        </Amentity>
                    )}
                </div>
                <Separator />
                <div className="flex gap-4 justify-between">
                    <div>
                        Room Price:{" "}
                        <span className="font-bold text-main">
                            ${room.price}
                        </span>
                        <span className="text-xs"> /24hrs</span>
                    </div>
                </div>
                <Separator />
                <div className="flex flex-col gap-2">
                    <CardTitle>Booking Details</CardTitle>
                    <div className="">
                        <div>
                            Room booked by {booking.username} for {dayCount}{" "}
                            {dayCount > 1 ? "days" : "day"} -{" "}
                            {moment(booking.bookedAt).fromNow()}
                        </div>
                        <div>Check-in: {checkIn}</div>
                        <div>Check-out: {checkOut}</div>
                        {booking.paymentStatus ? (
                            <div className="text-teal-500">
                                Paid ${booking.price} - Room Reserved
                            </div>
                        ) : (
                            <div className="text-rose-500">
                                Not Paid ${booking.price} - Room Not Reserved
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex gap-5">
                <Button
                    disabled={bookingIsLoading}
                    variant="outline"
                    onClick={() => router.push(`/hotel-details/${hotel.id}`)}
                >
                    View Hotel
                </Button>
                {!booking.paymentStatus && booking.userId === userId && (
                    <Button
                        disabled={bookingIsLoading}
                        onClick={() => handleBookRoom()}
                        className="bg-main hover:bg-main/90"
                    >
                        Pay Now
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default MyBookingClient;
