import React from "react";
import { TiWorld } from "react-icons/ti";
import { FaCar, FaSwimmingPool, FaWifi } from "react-icons/fa";
import { IoBed } from "react-icons/io5";
import { MdFastfood } from "react-icons/md";

const services = [
    {
        icon: <TiWorld />,
        name: "Pick Up & Drop",
        desc: "We’ll pick up from airport while you comfy on your ride, mus nellentesque habitant.",
    },
    {
        icon: <FaCar />,
        name: "Parking Space",
        desc: "Fusce tincidunt nis ace park norttito sit amet space, mus nellentesque habitant.",
    },
    {
        icon: <IoBed />,
        name: "Room Service",
        desc: "Room tincidunt nis ace park norttito sit amet space, mus nellentesque habitant.",
    },
    {
        icon: <FaSwimmingPool />,
        name: "Swimming Pool",
        desc: "Swimming pool tincidunt nise ace park norttito sit space, mus nellentesque habitant.",
    },
    {
        icon: <FaWifi />,
        name: "Fibre Internet",
        desc: "Wifi tincidunt nis ace park norttito sit amet space, mus nellentesque habitant.",
    },
    {
        icon: <MdFastfood />,
        name: "Breakfast",
        desc: "Eat tincidunt nisa ace park norttito sit amet space, mus nellentesque habitant.",
    },
];
const Service = () => {
    return (
        <div className="max-w-[1920px] mx-auto w-full xl:px-20 py-[120px] bg-white">
            <h3 className="uppercase font-barlow text-[#666] text-2xl font-normal mb-5 tracking-[6px]">
                OUR SERVICES
            </h3>
            <h1 className="text-5xl font-gilda font-bold mb-5">
                Hotel Facilities
            </h1>

            <div className="grid grid-cols-3 grid-rows-2 gap-5">
                {services.map((service, index) => (
                    <div
                        className="bg-transparent px-[20px] py-[30px] transition-all duration-500 relative z-1 mb-[30px] leading-[1] border-[1px] border-solid border-[#f1eeeb]"
                        key={index}
                    >
                        <div className="text-[45px] text-[#aa8453] leading-[1] mb-5 inline-block transition-all duration-500">
                            {service.icon}
                        </div>
                        <h3 className="text-[24px] text-[#000] font-gilda mb-[10px] font-normal leading-[1.25]">
                            {service.name}
                        </h3>
                        <p className="text-[15px] text-[#aaa] font-normal font-barlow leading-[1.75] m-0">
                            {service.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Service;
