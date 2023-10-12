"use client"

import { useRouter } from "next/navigation"
import { Filter } from "lucide-react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import ProductFilters from "@/components/ui/product-filters"

const ProductSortOptions = [
    { name: "Newest", value: "?isNew=true" },
    { name: "Price, low to high", value: "?price=asc" },
    { name: "Price, high to low", value: "?price=desc" },
]

interface ProductSortProps {
    categoryName: string
}

const ProductSort: React.FC<ProductSortProps> = ({ categoryName }) => {
    const router = useRouter()
    return (
        <div className="flex items-center">
            <Select onValueChange={(value) => router.replace(value)}>
                <SelectTrigger className="w-[150px] sm:w-[180px]">
                    <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {ProductSortOptions.map((product) => (
                            <SelectItem key={product.value} value={product.value}>{product.name}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Sheet>
                <SheetContent className="w-[300px]">
                    <SheetHeader>
                        <SheetTitle>Apply Filters</SheetTitle>
                        <SheetDescription>
                            Narrow your product search using the options below.
                        </SheetDescription>
                    </SheetHeader>
                    <ProductFilters categoryName={categoryName} />
                </SheetContent>
                <SheetTrigger className="-m-2 ml-2 p-2 text-gray-400 hover:text-gray-500 bg-slate-200 rounded-sm sm:ml-6 lg:hidden">
                    <span className="sr-only">Filters</span>
                    <Filter className="h-5 w-5" aria-hidden="true" />
                </SheetTrigger>
            </Sheet>
        </div>
    )
}

export default ProductSort