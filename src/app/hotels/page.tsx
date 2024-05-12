import { getHotels } from "@/actions/getHotels";
import Card from "@/components/component/Card";
import Filter from "@/components/component/Filter";
// import Map from "@/components/component/Map";
import { listData } from "@/lib/dummyData";
import { auth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

interface HotelsProps {
    searchParams: {
        title: string;
        country: string;
        state: string;
        city: string;
        roomsCount: number;
    };
}

const Hotels = async ({ searchParams }: HotelsProps) => {
    const data = listData;
    const { userId } = auth();
    const Map = useMemo(
        () =>
            dynamic(() => import("../../components/component/Map"), {
                loading: () => (
                    <div className="min-h-[100vh] flex items-center justify-center">
                        <Loader2 className="h-10 w-10 animate-spin" />
                    </div>
                ),
                ssr: false,
            }),
        []
    );
    const hotels = await getHotels(searchParams);

    if (!hotels) return <div>No hotels found....</div>;

    return (
        <div className="max-w-[1920px] mx-auto w-full xl:px-20 py-[120px] bg-white">
            <div className="flex h-full gap-[30px]">
                <div className="flex-[3] h-full">
                    <Filter />
                    <div className="flex flex-col gap-5 mt-10">
                        {hotels.map((hotel) => (
                            <Card
                                key={hotel.id}
                                hotel={hotel}
                                userId={userId || ""}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex-[2] h-[1000px] sticky top-0">
                    <Map data={hotels} />
                </div>
            </div>
        </div>
    );
};

export default Hotels;
