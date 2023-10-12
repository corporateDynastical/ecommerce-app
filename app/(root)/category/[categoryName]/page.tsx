
import { redirect } from 'next/navigation';

import PageTitle from '@/components/page-title';
import Container from '@/components/ui/container';
import ProductSort from '@/components/ui/product-sort';
import { Separator } from '@/components/ui/separator';
import ProductFilters from '@/components/ui/product-filters';
import ProductGrid from '@/components/ui/product-grid';

interface CategoryPageProps {
    params: { categoryName: string };
    searchParams: {
        name?: string
        size?: string
        color?: string
        isNew?: string
        price?: string
    }
}

const CategoryArr = ['kurti', 'Bags', 'belts', 'scarfs']

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {

    if (!(CategoryArr.includes(params.categoryName))) {
        redirect(`/`)
    }

    const { name, size, color, isNew, price } = searchParams
    console.log(name, size, color);

    const nameFilter = name ? `&name=${name}` : ""
    const sizeFilter = size ? `&size=${size}` : ""
    const colorFilter = color ? `&color=${color}` : ""
    const isNewFilter = isNew ? `&isNew=${isNew}` : ""
    const priceFilter = price ? `&price=${price}` : ""

    const filter = `?category=${params.categoryName}${nameFilter}${sizeFilter}${colorFilter}${isNewFilter}${priceFilter}`
    console.log(`http://localhost:3000/api/products${filter}`);

    const products = await fetch(`http://localhost:3000/api/products${filter}`)
    const data = await products.json()
    const categoryProducts = data.products
    // console.log(categoryProducts);

    return (
        <>
            <PageTitle name={params.categoryName} link={params.categoryName} />
            <Container>
                <div className="flex items-center justify-between pt-24 max-xl:px-4">
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl"><span>{categoryProducts.length}</span> results</h1>
                    <ProductSort categoryName={params.categoryName} />
                </div>
                <Separator className='my-8' />
                <div className='flex w-full items-start justify-between gap-6 relative min-h-screen max-xl:px-4'>
                    <div className='sticky top-0 flex-1 hidden lg:block'>
                        <ProductFilters categoryName={params.categoryName} />
                    </div>
                    <div className='flex-[4]'>
                        <ProductGrid products={categoryProducts} categoryName={params.categoryName} />
                    </div>
                </div>
            </Container>
        </>
    )
}