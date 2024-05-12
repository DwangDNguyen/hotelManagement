import Image from "next/image";
import React from "react";
import { IoBedOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { GiTowel } from "react-icons/gi";
import { FaArrowRightLong } from "react-icons/fa6";
const FeaturedRoom = () => {
    const rooms = [
        {
            name: "Family Room",
            desc: "Hotel non lorem ac erat suscipit bibendum nulla facilisi. Sedeuter nunc volutpat miss sapien vel conseyen turpeutionyer masin libero sevenion vusetion viventa augue sit amet hendrerit vestibulum. Duisteyerion venenatis lacus gravida eros ut turpis interdum ornare.",
            price: "200$",
            img: "/1.jpg",
        },
        {
            name: "Double Room",
            desc: "Hotel non lorem ac erat suscipit bibendum nulla facilisi. Sedeuter nunc volutpat miss sapien vel conseyen turpeutionyer masin libero sevenion vusetion viventa augue sit amet hendrerit vestibulum. Duisteyerion venenatis lacus gravida eros ut turpis interdum ornare.",
            price: "300$",
            img: "/2.jpg",
        },
        {
            name: "Deluxe Room",
            desc: "Hotel non lorem ac erat suscipit bibendum nulla facilisi. Sedeuter nunc volutpat miss sapien vel conseyen turpeutionyer masin libero sevenion vusetion viventa augue sit amet hendrerit vestibulum. Duisteyerion venenatis lacus gravida eros ut turpis interdum ornare.",
            price: "450$",
            img: "/3.jpg",
        },
        {
            name: "Superior Room",
            desc: "Hotel non lorem ac erat suscipit bibendum nulla facilisi. Sedeuter nunc volutpat miss sapien vel conseyen turpeutionyer masin libero sevenion vusetion viventa augue sit amet hendrerit vestibulum. Duisteyerion venenatis lacus gravida eros ut turpis interdum ornare.",
            price: "150$",
            img: "/7.jpg",
        },
        {
            name: "Junior Suit Room",
            desc: "Hotel non lorem ac erat suscipit bibendum nulla facilisi. Sedeuter nunc volutpat miss sapien vel conseyen turpeutionyer masin libero sevenion vusetion viventa augue sit amet hendrerit vestibulum. Duisteyerion venenatis lacus gravida eros ut turpis interdum ornare.",
            price: "175$",
            img: "/4.jpg",
        },
    ];
    return (
        <div className="max-w-[1920px] mx-auto w-full xl:px-20 py-[120px] bg-[#f8f5f0]">
            <h3 className="uppercase font-barlow text-[#666] text-2xl font-normal mb-5">
                THE CAPPA LUXURY HOTEL
            </h3>
            <h1 className="text-5xl font-gilda font-bold mb-5">
                Best Quality Rooms
            </h1>
            <div className="flex items-center justify-center gap-5 mt-[100px] mx-[150px]">
                {rooms.slice(0, 3).map((room, index) => (
                    <div key={index} className="flex-1 group">
                        <div
                            className=" relative min-h-[450px] bg-cover bg-center bg-no-repeat px-5 transition-all duration-1000 ease-in-out group-hover:brightness-75"
                            style={{
                                backgroundImage: `url(${room.img})`,
                                filter: "brightness(100%)",
                            }}
                        >
                            <div className="transition-all duration-1000 ease-in-out bg-[#0a0a0a] opacity-0 absolute inset-0 group-hover:opacity-50"></div>
                            {/* <Image
                                src={room.img}
                                alt={room.name}
                                width={0}
                                height={0}
                                style={{
                                    width: "auto",
                                    height: "auto",
                                }}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            /> */}
                            <span className="absolute bottom-[100px] text-white font-barlow ">
                                {room.price}
                            </span>
                            <h2 className="absolute bottom-[70px] text-2xl font-gilda text-white">
                                {room.name}
                            </h2>
                            <div className="absolute w-[20%] bottom-[60px] right-5 left-5 h-[2px] bg-[#aaa] transition-all duration-500 ease group-hover:w-[85%]"></div>
                            <div className="absolute bottom-[-70px] left-5 right-5 opacity-0 flex items-center justify-between transition-all duration-500 ease-in-out group-hover:bottom-[20px] group-hover:flex group-hover:opacity-100">
                                <div className="flex items-center gap-2">
                                    <IoBedOutline className="text-white text-2xl hover:text-[#aa8453]" />
                                    <LuBath className="text-white text-2xl hover:text-[#aa8453]" />
                                    <MdOutlineFreeBreakfast className="text-white text-2xl hover:text-[#aa8453]" />
                                    <GiTowel className="text-white text-2xl hover:text-[#aa8453]" />
                                </div>
                                <span className="flex items-center gap-2 text-white hover:text-[#aa8453] cursor-pointer transition-all duration-500">
                                    DETAIL
                                    <FaArrowRightLong />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center gap-5 mt-[20px] mx-[150px]">
                {rooms.slice(3, 5).map((room, index) => (
                    <div key={index} className="flex-1 group">
                        <div
                            className=" relative min-h-[350px] bg-cover bg-center bg-no-repeat px-5 transition-all duration-1000 ease-in-out group-hover:brightness-75"
                            style={{
                                backgroundImage: `url(${room.img})`,
                                filter: "brightness(100%)",
                            }}
                        >
                            <div className="transition-all duration-1000 ease-in-out bg-[#0a0a0a] opacity-0 absolute inset-0 group-hover:opacity-50"></div>
                            {/* <Image
                            src={room.img}
                            alt={room.name}
                            width={0}
                            height={0}
                            style={{
                                width: "auto",
                                height: "auto",
                            }}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        /> */}
                            <span className="absolute bottom-[100px] text-white font-barlow ">
                                {room.price}
                            </span>
                            <h2 className="absolute bottom-[70px] text-2xl font-gilda text-white">
                                {room.name}
                            </h2>
                            <div className="absolute w-[20%] bottom-[60px] right-5 left-5 h-[2px] bg-[#aaa] transition-all duration-500 ease group-hover:w-[92%]"></div>
                            <div className="absolute bottom-[-70px] left-5 right-5 opacity-0 flex items-center justify-between transition-all duration-500 ease-in-out group-hover:bottom-[20px] group-hover:flex group-hover:opacity-100">
                                <div className="flex items-center gap-2">
                                    <IoBedOutline className="text-white text-2xl hover:text-[#aa8453]" />
                                    <LuBath className="text-white text-2xl hover:text-[#aa8453]" />
                                    <MdOutlineFreeBreakfast className="text-white text-2xl hover:text-[#aa8453]" />
                                    <GiTowel className="text-white text-2xl hover:text-[#aa8453]" />
                                </div>
                                <span className="flex items-center gap-2 text-white hover:text-[#aa8453] cursor-pointer transition-all duration-500">
                                    DETAIL
                                    <FaArrowRightLong />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedRoom;
