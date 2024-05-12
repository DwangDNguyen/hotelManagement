import Image from "next/image";
import React from "react";
import Slide3 from "../../../public/slide3.jpg";
import MyBookingClient from "@/components/booking/MyBookingClient";
import { getBookingsByHotelOwnerId } from "@/actions/getBookingsByHotelOwnerId";
import { getBookings } from "@/actions/getBookings";
import { getBookingsByUserId } from "@/actions/getBookingsByUserId";

const MyBookings = async () => {
    const bookingsFromVisitors = await getBookingsByHotelOwnerId();
    const bookingsIHaveMade = await getBookingsByUserId();

    return (
        <div>
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
                        My Bookings
                    </h1>
                </div>
            </div>
            <div className="max-w-[1920px] w-full mx-auto py-[20px] xl:px-20  my-0 flex flex-col gap-10">
                <h2 className="text-xl md:text-2xl font-barlow font-bold text-main mt-2">
                    Here are bookings you have made
                </h2>
                {bookingsIHaveMade instanceof Error ? (
                    <div>{bookingsIHaveMade.message}</div>
                ) : !!bookingsIHaveMade?.length ? (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                            {bookingsIHaveMade.map((booking) => (
                                <MyBookingClient
                                    key={booking.id}
                                    booking={booking}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <h3>No bookings found...</h3>
                )}
                <h2 className="text-xl md:text-2xl font-barlow font-bold text-main mt-2">
                    Here are bookings visitors have made on your properties
                </h2>
                {bookingsFromVisitors instanceof Error ? (
                    <div>{bookingsFromVisitors.message}</div>
                ) : !!bookingsFromVisitors?.length ? (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                            {bookingsFromVisitors.map((booking) => (
                                <MyBookingClient
                                    key={booking.id}
                                    booking={booking}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <h3>No bookings found...</h3>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
