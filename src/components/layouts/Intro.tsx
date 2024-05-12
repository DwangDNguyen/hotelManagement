import React from "react";
import Container from "../Container";
import Image from "next/image";

const Intro = () => {
    return (
        <div className="max-w-[1920px] mx-auto w-full xl:px-20 py-[120px] bg-white">
            <div className="flex justify-between items-center gap-[50px]">
                <div className="w-1/2">
                    <h4 className="uppercase font-barlow text-[#666] text-2xl font-normal mb-5">
                        The Cappa Luxury Hotel
                    </h4>
                    <h1 className="text-5xl font-gilda font-bold mb-5">
                        Enjoy a Luxury Experience
                    </h1>
                    <p className="text-lg-[15px] mb-5 font-barlow">
                        Welcome to the best five-star deluxe hotel in New York.
                        Hotel elementum sesue the aucan vestibulum aliquam justo
                        in sapien rutrum volutpat. Donec in quis the
                        pellentesque velit. Donec id velit ac arcu posuere
                        blane.
                    </p>
                    <p className="text-lg-[15px] font-barlow">
                        Hotel ut nisl quam nestibulum ac quam nec odio elementum
                        sceisue the aucan ligula. Orci varius natoque penatibus
                        et magnis dis parturient monte nascete ridiculus mus
                        nellentesque habitant morbine.
                    </p>
                </div>
                <div className="w-1/2 flex gap-5 justify-center">
                    <Image
                        src="/8.jpg"
                        alt="intro"
                        width={300}
                        height={450}
                        className="mt-[50px]"
                    />
                    <Image
                        src="/2.jpg"
                        alt="section-img"
                        width={300}
                        height={450}
                        className="mb-[50px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default Intro;
