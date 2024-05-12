import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { hotelId: string } }
) {
    try {
        const hotelId = params.hotelId;
        const body = await req.json();
        // console.log("body: ", body);

        const { userId } = auth();
        if (!hotelId) {
            return new NextResponse("Invalid ID", { status: 400 });
        }

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await prismadb.hotelImages.deleteMany({
            where: {
                hotelId: hotelId,
            },
        });

        const hotel = await prismadb.hotel.update({
            where: {
                id: hotelId,
            },
            data: {
                ...body,
                images: {
                    createMany: {
                        data: body.images,
                        skipDuplicates: true,
                    },
                },
            },
        });

        return NextResponse.json(hotel);
    } catch (err) {
        console.log("error: ", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { hotelId: string } }
) {
    try {
        const hotelId = params.hotelId;
        const { userId } = auth();
        if (!hotelId) {
            return new NextResponse("Invalid ID", { status: 400 });
        }

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await prismadb.hotelImages.deleteMany({
            where: {
                hotelId: hotelId,
            },
        });

        await prismadb.room.deleteMany({
            where: {
                hotelId: hotelId,
            },
        });

        await prismadb.hotel.delete({
            where: {
                id: hotelId,
            },
        });

        return NextResponse.json({ msg: "Hotel deleted successfully" });
    } catch (e) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
