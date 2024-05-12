"use client";
import React from "react";
import Image from "next/image";
import Slide2 from "@/../public/slide2.jpg";
import { usePathname } from "next/navigation";
const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

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
                        {pathname === "/sign-in" ? "Sign In" : "Sign Up"}
                    </h1>
                </div>
            </div>
            <div className="h-screen flex items-center justify-center">
                {children}
            </div>
        </>
    );
};

export default ClerkLayout;
