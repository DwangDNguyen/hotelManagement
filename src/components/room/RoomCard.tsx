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
import AddRoomForm from "./AddRoomForm";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { DateRangePicker } from "./DateRangePicker";
import { DateRange } from "react-day-picker";
import { addDays, differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import useBookRoom from "@/hooks/useBookRoom";

interface RoomCardProps {
    hotel?: Hotel & {
        rooms: Room[];
        images: HotelImages[];
    };
    room: Room;
    bookings?: Booking[];
}

const RoomCard = ({ hotel, room, bookings = [] }: RoomCardProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bookingIsLoading, setBookingIsLoading] = useState(false);

    const [date, setDate] = useState<DateRange | undefined>();
    const [days, setDays] = useState(1);
    const [totalPrice, setTotalPrice] = useState(room.price);

    const pathname = usePathname();
    const isHotelDetailPage = pathname.includes("hotel-detail");
    const isBookRoom = pathname.includes("book-room");
    const router = useRouter();
    const { toast } = useToast();
    const { userId } = useAuth();
    const {
        setRoomData,
        paymentIntentId,
        setClientSecret,
        setPaymentIntentId,
    } = useBookRoom();

    useEffect(() => {
        if (date && date.from && date.to) {
            const daysCount = differenceInCalendarDays(date.to, date.from);
            setDays(daysCount);
            if (daysCount && room.price) {
                setTotalPrice(room.price * daysCount);
            } else {
                setTotalPrice(room.price);
                setDays(1);
            }
        } else {
            setTotalPrice(room.price);
            setDays(1);
        }
    }, [date, room.price]);

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        const roomBooking = bookings.filter(
            (booking) => booking.roomId === room.id && booking.paymentStatus
        );

        roomBooking.forEach((booking) => {
            const range = eachDayOfInterval({
                start: new Date(booking.checkIn),
                end: new Date(booking.checkOut),
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [bookings]);

    const handleDialogueOpen = () => {
        setOpen((prev) => !prev);
    };

    const handleRoomDelete = (room: Room) => {
        setIsLoading(true);
        const imageKey = room.image.substring(room.image.lastIndexOf("/") + 1);
        axios
            .post("/api/uploadthing/delete", { imageKey })
            .then((res) => {
                axios
                    .delete(`/api/room/${room.id}`)
                    .then((res) => {
                        router.refresh();
                        toast({
                            variant: "success",
                            description: "Room deleted successfully",
                        });
                    })
                    .catch((err) => {
                        toast({
                            variant: "error",
                            description:
                                "Something went wrong, please try again",
                        });
                        setIsLoading(false);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            })
            .catch((err) => {
                toast({
                    variant: "error",
                    description: "Something went wrong, please try again",
                });
                setIsLoading(false);
            });
    };

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

        if (date?.from && date?.to) {
            setBookingIsLoading(true);
            const bookingRoomData = {
                room,
                price: parseInt(totalPrice + ""),
                checkIn: date.from,
                checkOut: date.to,
            };
            console.log("hotel owner id", hotel?.userId);
            console.log("price", typeof bookingRoomData.price);
            console.log("payment intent id", paymentIntentId);

            setRoomData(bookingRoomData);

            await axios
                .post(
                    "/api/create-payment-intent",
                    JSON.stringify({
                        booking: {
                            hotelOwnerId: hotel?.userId,
                            hotelId: hotel?.id,
                            roomId: room.id,
                            checkIn: date.from,
                            checkOut: date.to,
                            price: totalPrice,
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
        } else {
            toast({
                variant: "error",
                description: "Please select check-in and check-out date",
            });
            setBookingIsLoading(false);
        }
    };

    return (
        <Card className="font-barlow">
            <CardHeader>
                <CardTitle className="line-clamp-2 font-gilda">
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
                {!isBookRoom && <Separator />}
            </CardContent>
            {!isBookRoom && (
                <CardFooter>
                    {isHotelDetailPage && hotel?.userId !== userId ? (
                        <div className="flex flex-col gap-6">
                            <div>
                                <div className="mb-2">
                                    Select days that you will stay in this room
                                </div>
                                <DateRangePicker
                                    date={date}
                                    setDate={setDate}
                                    disabledDates={disabledDates}
                                />
                            </div>
                            <div>
                                Total Price:{" "}
                                <b className="text-main font-barlow">
                                    ${totalPrice}
                                </b>{" "}
                                for{" "}
                                <b className="text-main font-barlow">{days}</b>{" "}
                                {days > 1 ? "days" : "day"}
                            </div>
                            <Button
                                className="w-full bg-main hover:bg-main/90"
                                onClick={() => handleBookRoom()}
                            >
                                {bookingIsLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                        Booking...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="mr-2 h-4 w-4" />{" "}
                                        Booking
                                    </>
                                )}
                            </Button>
                        </div>
                    ) : (
                        <div className="flex w-full justify-between">
                            <Button
                                onClick={() => handleRoomDelete(room)}
                                disabled={isLoading}
                                type="button"
                                variant="ghost"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash className="mr-2 h-4 w-4" />{" "}
                                        Delete
                                    </>
                                )}
                            </Button>
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <SquarePen className="mr-2 h-4 w-4" />
                                        Update Room
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[900px] w-[90%] max-h-[50vh] overflow-y-auto px-10 ">
                                    <DialogHeader>
                                        <DialogTitle>Update a room</DialogTitle>
                                        <DialogDescription>
                                            Make change to this room.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <AddRoomForm
                                        hotel={hotel}
                                        room={room}
                                        handleDialogueOpen={handleDialogueOpen}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}
                </CardFooter>
            )}
        </Card>
    );
};

export default RoomCard;
