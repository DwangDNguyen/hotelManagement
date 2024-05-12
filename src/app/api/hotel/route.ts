import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const { userId } = auth();
        console.log(body);
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const hotel = await prismadb.hotel.create({
            data: {
                ...body,
                images: {
                    createMany: {
                        data: body.images,
                        skipDuplicates: true,
                    },
                },
                userId,
            },
        });
        return NextResponse.json(hotel);
    } catch (e) {
        console.log("error: ", e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
