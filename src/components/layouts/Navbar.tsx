"use client";
import React, { useEffect, useState } from "react";
import Container from "../Container";
import Image from "next/image";
import Slide2 from "../../../public/slide2.jpg";
import Slide3 from "../../../public/slide3.jpg";
import LogoBlack from "../../../public/logo-dark.png";
import Logo from "../../../public/logo.png";
import ContactImg from "../../../public/contact.jpg";
import { usePathname, useRouter } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { CgMenuGridR } from "react-icons/cg";
import { Separator } from "../ui/separator";

type PathType = {
    home: string;
    about: string;
    contact: string;
    hotels: string;
    hotel: string;
    reservations: string;
    post: string;
    login: string;
};

const Navbar = () => {
    const router = useRouter();
    const { userId, isLoaded } = useAuth();
    const pathname = usePathname();
    console.log(userId);
    const [isScroll, setIsScroll] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [path, setPath] = useState<PathType | null>({
        home: pathname === "/" ? "home" : "",
        about: pathname === "/about" ? "about" : "",
        contact: pathname === "/contact" ? "contact" : "",
        hotels:
            pathname === "/hotels" || pathname === "/hotels/[params]"
                ? "hotels"
                : "",
        hotel: pathname === "/hotel/[id]" ? "hotel" : "",
        reservations: pathname === "/reservations" ? "reservations" : "",
        post: pathname === "/post" ? "post" : "",
        login: pathname === "/sign-in" ? "login" : "",
    });
    useEffect(
        function mount() {
            function onScroll() {
                if (window.scrollY > 0) {
                    setIsScroll(true);
                } else {
                    setIsScroll(false);
                }
            }

            window.addEventListener("scroll", onScroll);

            return function unMount() {
                window.removeEventListener("scroll", onScroll);
            };
        },
        [isScroll]
    );
    useEffect(() => {
        setPath({
            home: pathname === "/" ? "home" : "",
            about: pathname === "/about" ? "about" : "",
            contact: pathname === "/contact" ? "contact" : "",
            hotels:
                pathname === "/hotels" || pathname === "/hotels/[params]"
                    ? "hotels"
                    : "",
            hotel: pathname === "/hotel/[id]" ? "hotel" : "",
            reservations: pathname === "/reservations" ? "reservations" : "",
            post: pathname === "/post" ? "post" : "",
            login: pathname === "/auth/login" ? "login" : "",
        });
    }, [pathname]);
    return (
        <div className="bg-transparent">
            <div
                className={
                    isScroll
                        ? "max-w-[1920px] py-[20px] xl:px-20 mx-auto my-0 flex items-center justify-between fixed top-[-100px] transform translate-y-[100px] transition-transform transition duration-500 ease-in-out left-0 right-0 z-[999] bg-white shadow-[0px_5px_15px_rgb(15,36,84/5%)]"
                        : "max-w-[1920px] py-[20px] xl:px-20 mx-auto my-0 flex items-center justify-between fixed top-0 left-0 right-0 z-[999]"
                }
                // className="flex items-center justify-between z-50"
                //  "bg-white shadow-customNavbar flex items-center justify-between w-full top-[-100px] transform translate-y-[-100px] transition-transform transition duration-500 ease-in-out"
            >
                <div
                    className="cursor-pointer"
                    onClick={() => router.push("/")}
                >
                    <Image
                        src={isScroll ? LogoBlack : Logo}
                        alt="logo"
                        width={150}
                        style={{ height: "auto" }}
                    />
                </div>
                <nav>
                    <ul className="flex items-center list-none">
                        <li className="mt-0 mb-0 ml-5 mr-5">
                            <a
                                className={`no-underline font-bold cursor-pointer flex items-center gap-5 ${
                                    isScroll ? "text-black" : "text-white"
                                }`}
                                href="/"
                            >
                                Home
                            </a>
                        </li>
                        <li className="mt-0 mb-0 ml-5 mr-5">
                            <a
                                className={`no-underline font-bold cursor-pointer flex items-center gap-5 ${
                                    isScroll ? "text-black" : "text-white"
                                }`}
                                href="/about"
                            >
                                About
                            </a>
                        </li>
                        <li className="mt-0 mb-0 ml-5 mr-5">
                            <a
                                className={`no-underline font-bold cursor-pointer flex items-center gap-5 ${
                                    isScroll ? "text-black" : "text-white"
                                }`}
                                href="/hotels"
                            >
                                Hotels
                            </a>
                        </li>
                        <li className="mt-0 mb-0 ml-5 mr-5">
                            <a
                                className={`no-underline font-bold cursor-pointer flex items-center gap-5 ${
                                    isScroll ? "text-black" : "text-white"
                                }`}
                            >
                                News & Events
                            </a>
                        </li>
                        <li className="mt-0 mb-0 ml-5 mr-5">
                            <a
                                className={`no-underline font-bold cursor-pointer flex items-center gap-5 ${
                                    isScroll ? "text-black" : "text-white"
                                }`}
                                href="/contact"
                            >
                                Contact
                            </a>
                        </li>
                        {userId && (
                            <div className="relative z-[1000]">
                                <div>
                                    <CgMenuGridR
                                        onClick={() => setOpenMenu(!openMenu)}
                                        className={
                                            isScroll
                                                ? "text-black text-2xl mr-5 cursor-pointer"
                                                : "text-2xl mr-5 text-white cursor-pointer"
                                        }
                                    />
                                </div>
                                {openMenu && (
                                    <div className="absolute min-h-[150px] min-w-[200px] top-[30px] right-[20px] bottom-0 border border-[#f5f5f5] flex flex-col transition duration-500 ease-in-out animate-menu bg-white py-3 px-1 rounded-xl z-[1000]">
                                        <div
                                            onClick={() => {
                                                router.push("/hotel/new");
                                                setOpenMenu(false);
                                            }}
                                            className="font-barlow bg-white hover:bg-[#f5f5f5] p-2 rounded-xl cursor-pointer"
                                        >
                                            Add Hotel
                                        </div>
                                        {/* <Separator /> */}
                                        <div
                                            onClick={() => {
                                                router.push("/my-hotels");
                                                setOpenMenu(false);
                                            }}
                                            className="font-barlow bg-white hover:bg-[#f5f5f5] p-2 rounded-xl cursor-pointer"
                                        >
                                            My Hotels
                                        </div>
                                        <div
                                            onClick={() => {
                                                router.push("/my-bookings");
                                                setOpenMenu(false);
                                            }}
                                            className="font-barlow bg-white hover:bg-[#f5f5f5] p-2 rounded-xl cursor-pointer"
                                        >
                                            My Bookings
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        <UserButton afterSignOutUrl="/" />
                        {!userId && (
                            <Button
                                variant={isScroll ? "default" : "secondary"}
                                className="mt-0 mb-0 ml-5 mr-5 no-underline font-bold cursor-pointer flex items-center gap-5"
                                onClick={() => router.push("/sign-in")}
                            >
                                Login
                            </Button>
                        )}
                    </ul>
                </nav>
            </div>

            {path!.about === "about" && (
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
                            About Us
                        </h1>
                    </div>
                </div>
            )}
            {(path!.hotels === "hotels" ||
                path!.hotels === "hotels/[params]") && (
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
                            Hotels
                        </h1>
                    </div>
                </div>
            )}
            {path!.contact === "contact" && (
                <div className="relative h-[400px]">
                    <Image
                        src={ContactImg}
                        alt="contact-img"
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
                            Contact
                        </h1>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Navbar;
