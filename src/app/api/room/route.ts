import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const room = await prismadb.room.create({
            data: {
                ...body,
            },
        });

        return NextResponse.json(room);
    } catch (e) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
