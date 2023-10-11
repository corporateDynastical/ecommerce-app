import Link from "next/link";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";

export const Categories = [
    {
        name: "Kurtis",
        link: "kurti"
    },
    {
        name: "Bags",
        link: "Bags"
    },
    {
        name: "Belts",
        link: "belts"
    },
    {
        name: "Scarfs",
        link: "scarfs"
    },
]

const CategorySection = () => {
    return (
        <>
            <Container>
                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-xl:px-4'>
                    {Categories.map((category, index) => (
                        <div key={index} className='w-full h-96 border rounded-lg hover:shadow-lg relative'>
                            <Link href={`/category/${category.link}`}>
                                <div className='absolute bottom-10 left-6 space-y-2'>
                                    <h1 className="text-2xl font-semibold">{category.name}</h1>
                                    <Button variant={'outline'} size={'sm'}>
                                        View Collection
                                    </Button>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </Container>
        </>
    )
}

export default CategorySection