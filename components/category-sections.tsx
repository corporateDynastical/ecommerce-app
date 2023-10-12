import Link from "next/link";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Image from "next/image";
import { shimmer, toBase64 } from "@/lib/image";

export const Categories = [
    {
        name: "Kurtis",
        link: "kurti",
        showCaseImage: "/kurtis-showcase.jpg"
    },
    {
        name: "Bags",
        link: "Bags",
        showCaseImage: "/bags-showcase.jpg"
    },
    {
        name: "Belts",
        link: "belts",
        showCaseImage: "/belts-showcase.jpg"
    },
    {
        name: "Scarfs",
        link: "scarfs",
        showCaseImage: "/scarf-showcase.jpg"
    },
]

const CategorySection = () => {
    return (
        <div className="my-14 md:my-20">
            <Container>
                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-xl:px-4'>
                    {Categories.map((category, index) => (
                        <div key={index} className='w-full h-full rounded-lg hover:shadow-md dark:shadow-themeColor relative'>
                            <Image className="rounded-lg border bg-themeColor bg-opacity-50" src={category.showCaseImage} width={680} height={1000} alt={`${category.name}-image`} layout="responsive" />
                            <Link href={`/category/${category.link}`}>
                                <div className='absolute bottom-10 left-0 space-y-2 bg-themeColor dark:bg-black bg-opacity-80 dark:bg-opacity-80 w-full pl-6 py-4'>
                                    <h1 className="text-2xl font-bold text-themeText dark:text-white">{category.name}</h1>
                                    <Button variant={'outline'} size={'sm'}>
                                        View Collection
                                    </Button>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default CategorySection