import React from "react";
import {
    FaPhoneVolume,
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaFacebook,
    FaPinterest,
} from "react-icons/fa6";
const Footer = () => {
    return (
        <>
            <div className="max-w-[1920px] mx-auto w-full xl:px-20 bg-[#222] py-[120px] !px-[200px] flex justify-between items-center gap-[11rem]">
                <div className="flex-1 min-h-[300px]">
                    <h2 className="text-white mb-5 font-gilda text-[24px]">
                        About Hotel
                    </h2>
                    <div className="flex flex-col">
                        <span className="font-barlow text-[#adadad] text-[15px]">
                            Welcome to the best five-star deluxe hotel in New
                            York. Hotel elementum sesue the aucan vestibulum
                            aliquam justo in sapien rutrum volutpat.
                        </span>
                    </div>
                </div>
                <div className="flex-1 min-h-[300px]">
                    <h2 className="text-white mb-5 font-gilda text-[24px]">
                        Explore
                    </h2>
                    <div className="flex flex-col gap-5">
                        <ul className="flex flex-col gap-5">
                            <li>
                                <a
                                    href="/"
                                    className="text-[#adadad] font-barlow text-[15px]"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/about"
                                    className="text-[#adadad] font-barlow text-[15px]"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    className="text-[#adadad] font-barlow text-[15px]"
                                >
                                    Rooms
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    className="text-[#adadad] font-barlow text-[15px]"
                                >
                                    Reservation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    className="text-[#adadad] font-barlow text-[15px]"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex-1 min-h-[300px]">
                    <h2 className="text-white mb-5 font-gilda text-[24px]">
                        Contact
                    </h2>
                    <div className="footer-top-content">
                        <span className="text-[#adadad] font-barlow text-[15px]">
                            1616 Broadway NY, New York 10001 United States of
                            America
                        </span>
                        <div className="flex items-center gap-5 font-gilda mt-5">
                            <FaPhoneVolume className="text-[24px] text-white" />
                            <span className="text-[24px] text-white">
                                1-800-123-1234
                            </span>
                        </div>
                        <p className="text-[#fff] font-barlow text-[15px] mt-5 relative after:absolute after:h-[1px] after:w-[55%] after:bg-[#aa8453] after:left-0 after:bottom-0">
                            info@luxuryhotel.com
                        </p>
                        <div className="flex items-center gap-3 font-gilda mt-5 text-[15px] text-white">
                            <FaInstagram className="hover:text-[#aa8453] transition-all duration-500 cursor-pointer" />
                            <FaTwitter className="hover:text-[#aa8453] transition-all duration-500 cursor-pointer" />
                            <FaYoutube className="hover:text-[#aa8453] transition-all duration-500 cursor-pointer" />
                            <FaFacebook className="hover:text-[#aa8453] transition-all duration-500 cursor-pointer" />
                            <FaPinterest className="hover:text-[#aa8453] transition-all duration-500 cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#1e1e1e] py-5 text-center text-white">
                <span className="text-[#adadad] font-barlow text-[12px]">
                    © 2024 ComforHotel. All rights reserved
                </span>
            </div>
        </>
    );
};

export default Footer;
