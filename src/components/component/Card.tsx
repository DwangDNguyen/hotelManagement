"use client";
import { CalendarCheck, Edit, Locate, LocateFixed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePerson2 } from "react-icons/md";
import { MdOutlineBedroomChild } from "react-icons/md";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { HotelWithRooms } from "../hotel/AddHotelForm";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import useLocationHotel from "@/hooks/useLocationHotel";
import { MapContainer } from "react-leaflet";
const Card = ({ hotel, userId }: { hotel: HotelWithRooms; userId: string }) => {
    console.log(hotel);
    const { setLongitude, setLatitude } = useLocationHotel();
    const pathname = usePathname();
    const isMyHotels = pathname.includes("my-hotels");
    const router = useRouter();
    return (
        <div>
            <div className={isMyHotels ? "flex flex-col" : "flex gap-5"}>
                <div
                    onClick={() => router.push(`/hotel-detail/${hotel.id}`)}
                    className={
                        isMyHotels
                            ? " h-[200px] relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                            : "flex-[2] relative aspect-square overflow-hidden h-[200px] rounded-lg cursor-pointer"
                    }
                >
                    <Image
                        src={hotel.images[0].url}
                        alt={hotel.title}
                        fill
                        className="object-cover transition hover:scale-105 col-span-1"
                    />
                </div>
                <div className="flex-[3] flex flex-col justify-between gap-[10px]">
                    <div className="flex justify-between gap-5">
                        <div className="flex-[5] flex flex-col font-barlow">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <h1
                                            onClick={() =>
                                                router.push(
                                                    `/hotel-detail/${hotel.id}`
                                                )
                                            }
                                            className="text-[20px] font-barlow font-bold line-clamp-2 leading-[1.8rem] h-[3.6rem] cursor-pointer"
                                        >
                                            {hotel.title}
                                        </h1>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{hotel.title}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <div className="flex items-center gap-2">
                                <IoLocationOutline />
                                <p>
                                    {hotel.country}, {hotel.state}, {hotel.city}
                                </p>
                            </div>
                        </div>
                        {hotel.userId === userId && (
                            <span
                                onClick={() =>
                                    router.push(`/hotel/${hotel.id}`)
                                }
                                className="font-gilda text-[24px] text-[#aa8f69] mt-2"
                            >
                                <Edit className="w-4 h-4 cursor-pointer" />
                            </span>
                        )}
                    </div>
                    <div className="flex justify-between gap-5">
                        <div className="flex-[5] flex gap-3 font-barlow">
                            <div className="flex gap-2 items-center bg-[#f6f6f6] px-2 py-1 rounded-[5px]">
                                <CalendarCheck className="w-4 h-4" />
                                <p>{hotel.bookings.length} books</p>
                            </div>
                            <div className="flex gap-2 items-center bg-[#f6f6f6] px-2 py-1 rounded-[5px]">
                                <MdOutlineBedroomChild />
                                <p>{hotel.rooms.length} rooms</p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div
                                onClick={() => {
                                    setLongitude(hotel.longitude);
                                    setLatitude(hotel.latitude);
                                }}
                                className="border flex items-center justify-center p-2 bg-[#f6f6f6] rounded-[5px] z-[99]"
                            >
                                <LocateFixed className="cursor-pointer w-4 h-4" />
                            </div>

                            <div className="border flex items-center justify-center p-2 bg-[#f6f6f6] rounded-[5px] z-[99]">
                                <MdFavorite className="text-red-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
