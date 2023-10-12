import prisma from "@/prisma";
import { connectToDb } from "@/utils";
import { Image } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url)
    const product_name = searchParams.get('name') || undefined
    const product_price = searchParams.get('price') || undefined
    const size = searchParams.get('size') || undefined
    const category = searchParams.get('category') || undefined
    const color = searchParams.get('color') || undefined
    const product_isNew = searchParams.get('isNew')

    await connectToDb();

    const products = await prisma.product.findMany({
      where: {
        AND: [
          {
            name: product_name ? { equals: product_name } : undefined,
          },
          {
            sizes: size ? { has: size } : undefined
          },
          {
            categories: category ? { has: category } : undefined
          },
          {
            colors: color ? { has: color } : undefined
          },
          {
            isNew: product_isNew ? { equals: JSON.parse(product_isNew) } : undefined
          },
          {
            isFeatured: true
          }
        ],
      },
      include: {
        images: true,
      },
      orderBy: {
        price: product_price === 'asc' ? 'asc' : product_price === 'desc' ? 'desc' : undefined
      }
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
      !currency
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
