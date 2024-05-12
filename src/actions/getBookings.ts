import prismadb from "@/lib/prismadb";

export const getBookings = async (hotelId: string) => {
    try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const bookings = await prismadb.booking.findMany({
            where: {
                hotelId,
                checkOut: {
                    gt: yesterday,
                },
            },
        });
        return bookings;
    } catch (e: any) {
        console.log(e);
        throw new Error(e);
    }
};
