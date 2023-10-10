import prisma from "@/prisma";
import { connectToDb } from "@/utils";
import { Image } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connectToDb();
    const products = await prisma.product.findMany({
      include: {
        images: true,
      },
    });
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("PRODUCTS_GET_ERROR", { status: 500 });
  } finally {
    await prisma.$disconnect().then(() => console.log("Database Disconnected"));
  }
};

export const POST = async (req: Request) => {
  try {
    const {
      name,
      description,
      price,
      images,
      sizes,
      categories,
      colors,
      currency,
      isNew,
      isFeatured,
    } = await req.json();

    if (
      !name ||
      !description ||
      !price ||
      !images ||
      !sizes ||
      !categories ||
      !colors ||
      !currency ||
      !isNew ||
      !isFeatured
    ) {
      return new NextResponse(
        "name,description,price,images,sizes,categories,colors,currency,isNew,isFeatured is Required",
        { status: 403 }
      );
    }

    await connectToDb();
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        images: {
          createMany: {
            data: images.map((image: Image) => ({
              url: image.url,
            })),
          },
        },
        sizes: sizes.map((size: string) => size),
        categories: categories.map((category: string) => category),
        colors: colors.map((color: string) => color),
        currency,
        isNew,
        isFeatured,
      },
      include: {
        images: true,
      },
    });
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("PRODUCTS_POST_ERROR", { status: 500 });
  } finally {
    await prisma.$disconnect().then(() => console.log("Database Disconnected"));
  }
};
