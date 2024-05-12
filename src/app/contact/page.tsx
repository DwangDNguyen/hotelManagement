"use client";

import React, { useEffect, useState } from "react";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
const Contact = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    return (
        <div className="max-w-[1920px] mx-auto w-full xl:px-20 py-[120px]">
            <div className="flex gap-[50px]">
                <div className="flex-1 flex flex-col gap-5">
                    <h1 className="m-0 text-[24px] text-[#222] font-gilda leading-[1.25rem]">
                        The Cappa Luxury Hotel
                    </h1>
                    <span className="font-barlow text-[#666] mb-5 leading-[1.75rem]">
                        Hotel ut nisl quam nestibulum ac quam nec odio elementum
                        sceisue the aucan ligula. Orci varius natoque penatibus
                        et magnis dis parturient monte nascete ridiculus mus
                        nellentesque habitant morbine.
                    </span>
                    <div className="flex items-center gap-[30px] font-barlow">
                        <FaPhoneVolume className="text-[2rem] text-[#aa8453]" />
                        <span>(+84) 123 456 789</span>
                    </div>
                    <div className="flex items-center gap-[30px] font-barlow">
                        <MdOutlineEmail className="text-[2rem] text-[#aa8453]" />
                        <span>info@luxuryhotel.com</span>
                    </div>
                    <div className="flex items-center gap-[30px] font-barlow">
                        <IoLocationOutline className="text-[2rem] text-[#aa8453]" />
                        <span>
                            1616 Broadway NY, New York 10001 United States of
                            America
                        </span>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-5">
                    <h1 className="m-0 text-[24px] text-[#222] font-gilda leading-[1.25rem]">
                        Get in touch
                    </h1>
                    <div className="grid grid-cols-2 gap-5">
                        <input
                            type="text"
                            placeholder="Your name *"
                            name="name"
                            className="font-barlow text-[14px] border-b-[1px] border-solid border-[#ececec] w-full leading-[1.5rem] py-[10px] bg-transparent focus:outline-none focus:border-b-[1px] focus:border-solid focus:border-[#aa8453]"
                        />
                        <input
                            type="email"
                            placeholder="Your email *"
                            name="email"
                            className="font-barlow text-[14px] border-b-[1px] border-solid border-[#ececec] w-full leading-[1.5rem] py-[10px] bg-transparent focus:outline-none focus:border-b-[1px] focus:border-solid focus:border-[#aa8453]"
                        />
                        <input
                            type="number"
                            name="number"
                            placeholder="Your number *"
                            className="font-barlow text-[14px] border-b-[1px] border-solid border-[#ececec] w-full leading-[1.5rem] py-[10px] bg-transparent focus:outline-none focus:border-b-[1px] focus:border-solid focus:border-[#aa8453] appearance-none"
                        />
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject *"
                            className="font-barlow text-[14px] border-b-[1px] border-solid border-[#ececec] w-full leading-[1.5rem] py-[10px] bg-transparent focus:outline-none focus:border-b-[1px] focus:border-solid focus:border-[#aa8453]"
                        />
                    </div>
                    <textarea
                        name="message"
                        placeholder="Your message *"
                        id=""
                        cols={30}
                        rows={10}
                        className="font-barlow text-[14px] max-w-full mb-[15px] py-[10px] h-auto bg-transparent shadow-none border-b-[1px] border-solid border-[#ececec] focus:outline-none focus:border-b-[1px] focus:border-solid focus:border-[#aa8453]  leading-[1.5rem] appearance-none"
                    ></textarea>
                    <button className="group relative text-[14px] tracking-[3px] uppercase font-barlow flex justify-center items-center bg-[#aa8453] text-[#fff] px-[30px] py-[10px] overflow-hidden w-[200px] border-none after:content-[''] after:absolute after:top-0 after:left-full after:w-0 after:h-full after-right-0 after:bg-[#000] after:transition-all after:duration-300 hover:after:w-full hover:after:right-auto hover:after:left-0 hover:after:transition-[width] hover:after:duration-500">
                        <span className="z-10">Send message</span>
                    </button>
                </div>
            </div>
            {isClient && (
                <div className="mt-[150px] w-full flex items-center justify-center">
                    <iframe
                        width="1220"
                        height="600"
                        frameBorder={0}
                        marginHeight={0}
                        marginWidth={0}
                        src="https://maps.google.com/maps?width=1220&amp;height=400&amp;hl=en&amp;q=1616%20Broadway%20NY,%20New%20York%2010001%20United%20States%20of%20America+(The%20Cappa%20Luxury%20Hotel)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    >
                        <a href="https://www.maps.ie/population/">
                            Population mapping
                        </a>
                    </iframe>
                </div>
            )}
        </div>
    );
};

export default Contact;
