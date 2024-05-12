import prismadb from "@/lib/prismadb";

export const getHotels = async (searchParams: {
    title: string;
    country: string;
    state: string;
    city: string;
    roomsCount: number;
}) => {
    try {
        const { title, country, state, city, roomsCount } = searchParams;
        const hotels = await prismadb.hotel.findMany({
            where: {
                title: {
                    contains: title,
                },
                country,
                state,
                city,
            },
            include: {
                rooms: true,
                images: true,
                bookings: true,
            },
        });
        return hotels;
    } catch (e: any) {
        console.log(e);
        throw new Error(e);
    }
};
