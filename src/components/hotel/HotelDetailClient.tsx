"use client";
import React from "react";
import { HotelWithRooms } from "./AddHotelForm";
import { Booking } from "@prisma/client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import Amentity from "../Amentity";
import {
    Beer,
    Bike,
    Coffee,
    Dumbbell,
    MapPin,
    MonitorStop,
    ShoppingCart,
    SquareParking,
    UtensilsCrossed,
    WashingMachine,
    Wifi,
} from "lucide-react";
import { FaSpa } from "react-icons/fa6";
import { FaSwimmingPool } from "react-icons/fa";
import RoomCard from "../room/RoomCard";

const HotelDetailClient = ({
    hotel,
    bookings,
}: {
    hotel: HotelWithRooms;
    bookings?: Booking[];
}) => {
    return (
        <>
            <div className="">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="h-full"
                >
                    <CarouselContent className="h-full">
                        {hotel?.images.map((item, index) => (
                            <CarouselItem
                                style={{ paddingLeft: 0 }}
                                key={index}
                            >
                                <div className="relative relative aspect-square overflow-hidden w-full h-[600px]">
                                    <Image
                                        src={item.url}
                                        alt="slide-1"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="absolute top-1/2 left-[100px]">
                        <CarouselPrevious />
                    </div>
                    <div className="absolute top-1/2 right-[100px]">
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>
            <div className="xl:px-20 py-[60px]">
                <h1 className="font-semibold text-xl md:text-3xl">
                    {hotel?.title}
                </h1>
                <div className="mt-4">
                    <Amentity>
                        <MapPin className="h-4 w-4" />
                        {hotel?.country}, {hotel?.state}, {hotel?.city}
                    </Amentity>
                </div>
                <h3 className="font-semibold text-lg mt-4 mb-2">
                    Location Details
                </h3>
                <p className="text-primary/90 mb-2">
                    {hotel.locationDescription}
                </p>
                <h3 className="font-semibold text-lg mt-4 mb-2">About hotel</h3>
                <p className="text-primary/90 mb-2">{hotel.description}</p>
                <h3 className="font-semibold text-lg mt-4 mb-2">
                    Hotel Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 content-start text-sm">
                    {hotel.gym && (
                        <Amentity>
                            <Dumbbell className="h-4 w-4" /> Gym
                        </Amentity>
                    )}
                    {hotel.spa && (
                        <Amentity>
                            <FaSpa className="h-4 w-4" /> Spa
                        </Amentity>
                    )}
                    {hotel.bar && (
                        <Amentity>
                            <Beer className="h-4 w-4" /> Bar
                        </Amentity>
                    )}
                    {hotel.laundry && (
                        <Amentity>
                            <WashingMachine className="h-4 w-4" /> laundry
                        </Amentity>
                    )}
                    {hotel.restaurant && (
                        <Amentity>
                            <UtensilsCrossed className="h-4 w-4" /> Restaurant
                        </Amentity>
                    )}
                    {hotel.shopping && (
                        <Amentity>
                            <ShoppingCart className="h-4 w-4" /> Shopping
                        </Amentity>
                    )}
                    {hotel.freeParking && (
                        <Amentity>
                            <SquareParking className="h-4 w-4" /> Free Parking
                        </Amentity>
                    )}
                    {hotel.bikeRental && (
                        <Amentity>
                            <Bike className="h-4 w-4" /> Bike Rental
                        </Amentity>
                    )}
                    {hotel.freeWifi && (
                        <Amentity>
                            <Wifi className="h-4 w-4" /> Free Wifi
                        </Amentity>
                    )}
                    {hotel.movieNights && (
                        <Amentity>
                            <MonitorStop className="h-4 w-4" /> Movie Nights
                        </Amentity>
                    )}
                    {hotel.swimmingPool && (
                        <Amentity>
                            <FaSwimmingPool className="h-4 w-4" /> Swimming Pool
                        </Amentity>
                    )}
                    {hotel.coffeeShop && (
                        <Amentity>
                            <Coffee className="h-4 w-4" /> Coffee Shop
                        </Amentity>
                    )}
                </div>
            </div>
            <div className="px-20 pb-20">
                {!!hotel.rooms.length && (
                    <div>
                        <h3 className="text-lg font-semibold my-4">Rooms</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {hotel.rooms.map((room) => {
                                return (
                                    <RoomCard
                                        hotel={hotel}
                                        room={room}
                                        key={room.id}
                                        bookings={bookings}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
export default HotelDetailClient;
