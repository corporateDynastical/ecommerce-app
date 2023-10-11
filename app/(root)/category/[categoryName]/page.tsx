import { Product } from '@prisma/client';
import { redirect } from 'next/navigation';

import PageTitle from '@/components/page-title';

interface CategoryPageProps {
    params: { categoryName: string };
    searchParams: {
        name?: string
        size?: string
        color?: string
    }
}

const CategoryArr = ['kurti', 'Bags', 'belts', 'scarfs']

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {

    if (!(CategoryArr.includes(params.categoryName))) {
        redirect(`/`)
    }

    const { name, size, color } = searchParams
    console.log(name, size, color);

    const nameFilter = name ? `&name=${name}` : ""
    const sizeFilter = size ? `&size=${size}` : ""
    const colorFilter = color ? `&color=${color}` : ""

    const filter = `?category=${params.categoryName}${nameFilter}${sizeFilter}${colorFilter}`
    console.log(`http://localhost:3000/api/products${filter}`);

    const products = await fetch(`http://localhost:3000/api/products${filter}`)
    const data = await products.json()
    console.log(data);

    return (
        <>
            <PageTitle name={params.categoryName} link={params.categoryName} />
        </>
    )
}