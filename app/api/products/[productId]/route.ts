import prisma from "@/prisma"
import { connectToDb } from "@/utils";
import { NextResponse } from "next/server"

export const GET = async (
    req: Request,
    { params }: { params: { productId: string } }
) => {
    try {
        await connectToDb();
        if (!params.productId) {
            return new NextResponse("Product Id is required", { status: 400 })
        }

        const product = await prisma.product.findUnique({
            where: {
                id: params.productId
            },
            include: {
                images: true,
            },
        })

        return NextResponse.json({ product }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("PRODUCTS_GET_ERROR", { status: 500 });
    } finally {
        await prisma.$disconnect().then(() => console.log("Database Disconnected"));
    }
}