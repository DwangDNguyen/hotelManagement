import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Slide2 from "@/../public/slide2.jpg";
import { getHotelById } from "@/actions/getHotelById";
import HotelDetailClient from "@/components/hotel/HotelDetailClient";
import { getBookings } from "@/actions/getBookings";
import { auth } from "@clerk/nextjs";

interface HotelDetailProps {
    params: {
        hotelId: string;
    };
}

const HotelDetail = async ({ params }: HotelDetailProps) => {
    const hotel = await getHotelById(params.hotelId);

    if (!hotel) {
        return (
            <>
                <div className="relative h-[400px]">
                    <Image
                        src={Slide2}
                        alt="slide-2"
                        fill={true}
                        priority
                        sizes="100vw"
                        style={{ objectFit: "cover" }}
                        className="absolute top-0 left-0 right-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"></div>
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 flex flex-col items-center">
                        <h3 className="text-[15px] font-barlow tracking-[6px] text-white uppercase m-0">
                            Luxury hotel{" "}
                        </h3>
                        <h1 className="text-[60px] font-gilda text-white ">
                            Hotel Detail
                        </h1>
                    </div>
                </div>
                <div className="min-h-[100vh] flex items-center justify-center">
                    <h1 className="font-gilda text-[40px] text-main ">
                        Oop!! Hotel not found
                    </h1>
                </div>
            </>
        );
    }
    const bookings = await getBookings(hotel.id);
    return (
        <div className="max-w-[1920px] mx-auto w-full bg-white">
            <HotelDetailClient hotel={hotel} bookings={bookings} />
        </div>
    );
};

export default HotelDetail;
