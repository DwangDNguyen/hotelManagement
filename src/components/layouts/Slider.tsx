import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Container from "../Container";
import Image from "next/image";
import Slide1 from "../../../public/slide1.jpg";
import Slide2 from "../../../public/slide2.jpg";
import Slide3 from "../../../public/slide3.jpg";

const Slider = () => {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
        >
            <CarouselContent>
                <CarouselItem style={{ paddingLeft: 0 }}>
                    <div className="relative">
                        <Image
                            src={Slide1}
                            alt="slide-1"
                            height={0}
                            width={0}
                            style={{ width: "auto", height: "100%" }}
                        />
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"></div>
                        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                            <h3 className="text-white text-center text-3xl uppercase font-bold mb-4">
                                Luxury hotel & best resort
                            </h3>
                            <h1 className="text-white text-center text-5xl uppercase font-bold">
                                Enjoy a luxury experience
                            </h1>
                        </div>
                    </div>
                </CarouselItem>
                <CarouselItem style={{ paddingLeft: 0 }}>
                    <div className="relative">
                        <Image
                            src={Slide2}
                            alt="slide-1"
                            height={0}
                            width={0}
                            style={{ width: "auto", height: "100%" }}
                        />
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"></div>
                        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                            <h3 className="text-white text-center text-3xl uppercase font-bold mb-4">
                                Luxury hotel & best resort
                            </h3>
                            <h1 className="text-white text-center text-5xl uppercase font-bold">
                                Enjoy a luxury experience
                            </h1>
                        </div>
                    </div>
                </CarouselItem>
                <CarouselItem style={{ paddingLeft: 0 }}>
                    <div className="relative">
                        <Image
                            src={Slide3}
                            alt="slide-1"
                            height={0}
                            width={0}
                            style={{ width: "auto", height: "100%" }}
                        />
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"></div>
                        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                            <h3 className="text-white text-center text-3xl uppercase font-bold mb-4">
                                Luxury hotel & best resort
                            </h3>
                            <h1 className="text-white text-center text-5xl uppercase font-bold">
                                Enjoy a luxury experience
                            </h1>
                        </div>
                    </div>
                </CarouselItem>
            </CarouselContent>
            <div className="absolute top-1/2 left-[100px]">
                <CarouselPrevious />
            </div>
            <div className="absolute top-1/2 right-[100px]">
                <CarouselNext />
            </div>
        </Carousel>
    );
};

export default Slider;
