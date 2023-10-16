import Link from "next/link";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { shimmer, toBase64 } from "@/lib/image";
import { cn } from "@/lib/utils";

export const Categories = [
    {
        name: "Kurtis",
        link: "kurti",
        showCaseImage: "/belts-showcase.jpg"
    },
    {
        name: "Bags",
        link: "Bags",
        showCaseImage: "/belts-showcase.jpg"
    },
    {
        name: "Belts",
        link: "belts",
        showCaseImage: "/belts-showcase.jpg"
    },
    {
        name: "Scarfs",
        link: "scarfs",
        showCaseImage: "/belts-showcase.jpg"
    },
]

const CategorySection = () => {
    return (
        <div className="my-14 md:my-24">
            <Container>
                <div className='flex flex-col gap-14'>
                    {Categories.map((category, index) => (
                        <div key={index} className={`${cn('w-full flex items-center justify-center gap-6', index % 2 === 0 ? 'flex-row-reverse' : '')}`}>
                            <div className="w-[200px] sm:w-[400px] z-[1] relative">
                                <AspectRatio ratio={2 / 2} className="bg-muted">
                                    <Image objectFit="cover" className="rounded-sm bg-white dark:bg-slate-500 group-hover:opacity-75" src={category.showCaseImage} fill alt={`${category.name}-image`} placeholder="blur"
                                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                            shimmer(225, 280)
                                        )}`} />
                                </AspectRatio>
                            </div>
                            <Link href={`/category/${category.link}`}>
                                <div className={`${cn('flex flex-col justify-start h-full w-full space-y-1 sm:space-y-4 z-10 relative', index % 2 === 0 ? 'items-start text-start' : 'items-end text-end')}`}>
                                    <h1 className="text-xl sm:text-6xl font-bold text-themeText dark:text-white lg:leading-tight w-min">{category.name} Collection {new Date().getFullYear()}</h1>
                                    <Button className="min-w-max" variant={'link'} size={'default'}>
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