import React from "react";
import { Marker, Popup } from "react-leaflet";
import Image from "next/image";

const Pin = ({ item }: { item: any }) => {
    return (
        <Marker position={[item.latitude, item.longitude]}>
            <Popup className="min-w-[200px]">
                <div className="flex gap-5 w-full">
                    <div className="relative aspect-square overflow-hidden w-[64px] h-[48px] rounded-lg">
                        <Image
                            src={item.images[0].url}
                            alt={item.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col justify-between">
                        <h1 className="font-bold text-[14px]">{item.title}</h1>
                        <span>{item.rooms.length} rooms</span>
                        <b className="text-[#aa8f69] text-[10px] line-clamp-2">{`${item.locationDescription}`}</b>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
};

export default Pin;
