import AddHotelForm from "@/components/hotel/AddHotelForm";
import React from "react";
import { getHotelById } from "@/actions/getHotelById";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Slide3 from "../../../../public/slide3.jpg";

interface HotelProps {
    params: {
        hotelId: string;
    };
}

const AddHotel = async ({ params }: HotelProps) => {
    const hotel = await getHotelById(params.hotelId);
    const { userId } = auth();
    if (!userId) return <div>Sign in to add hotel</div>;
    if (hotel && hotel.userId !== userId)
        return <div>{`You don't have permission`}</div>;
    return (
        <div>
            <div className="relative h-[400px]">
                <Image
                    src={Slide3}
                    alt="slide-3"
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
                    <h1 className="text-[60px] font-gilda text-white">
                        {hotel ? "Update Hotel" : "Add Hotel"}
                    </h1>
                </div>
            </div>
            <AddHotelForm hotel={hotel} />
        </div>
    );
};

export default AddHotel;
