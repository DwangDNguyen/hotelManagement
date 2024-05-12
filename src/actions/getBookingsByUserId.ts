import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export const getBookingsByUserId = async () => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new Error("Unauthorized");
        }
        const bookings = await prismadb.booking.findMany({
            where: {
                userId,
            },
            include: {
                room: true,
                hotel: true,
            },
            orderBy: {
                bookedAt: "desc",
            },
        });

        if (!bookings) {
            return new Error("No bookings found");
        }

        return bookings;
    } catch (e: any) {
        throw new Error(e);
    }
};
