import { getHotelsByUserId } from "@/actions/getHotelsByUserId";
import Image from "next/image";
import React from "react";
import Slide3 from "../../../public/slide3.jpg";
import Card from "@/components/component/Card";

const MyHotels = async () => {
    const hotels = await getHotelsByUserId();
    console.log(hotels);
    if (!hotels) {
        return (
            <>
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
                            My Hotels
                        </h1>
                    </div>
                </div>
                <h2 className="text-5xl font-barlow text-main text-center">
                    No hotels found...
                </h2>
            </>
        );
    }

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
                        My Hotels
                    </h1>
                </div>
            </div>
            <div className="max-w-[1920px] mx-auto w-full xl:px-20 py-[120px] bg-white">
                <h2 className="font-barlow text-4xl text-main font-bold">
                    Here are your properties
                </h2>
                <div className="grid grid-cols-4 gap-10 mt-10">
                    {hotels instanceof Error ? (
                        <div>{hotels.message}</div>
                    ) : (
                        hotels.map((hotel: any) => (
                            <Card
                                key={hotel.id}
                                hotel={hotel}
                                userId={hotel.userId || ""}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyHotels;
