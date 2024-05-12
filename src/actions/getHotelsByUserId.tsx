import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export const getHotelsByUserId = async () => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new Error("Unauthorized");
        }
        const hotels = await prismadb.hotel.findMany({
            where: {
                userId,
            },
            include: {
                rooms: true,
                images: true,
                bookings: true,
            },
        });

        if (!hotels) {
            return new Error("No hotels found");
        }

        return hotels;
    } catch (e: any) {
        throw new Error(e);
    }
};
