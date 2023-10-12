"use client"

import { useRouter, useSearchParams } from "next/navigation"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const filters = [
    {
        id: "size",
        name: "Size",
        options: [
            { referenceValue: "XS", value: "?size=XS", label: "X-Small" },
            { referenceValue: "S", value: "?size=S", label: "Small" },
            { referenceValue: "M", value: "?size=M", label: "Medium" },
            { referenceValue: "L", value: "?size=L", label: "Large" },
            { referenceValue: "XL", value: "?size=XL", label: "X-Large" },
            { referenceValue: "One", value: "?size=One", label: "One Size" },
        ],
    },
    {
        id: "color",
        name: "Color",
        options: [
            { referenceValue: "black", value: "?color=black", label: "Black" },
            { referenceValue: "blue", value: "?color=blue", label: "Blue" },
            { referenceValue: "brown", value: "?color=brown", label: "Brown" },
            { referenceValue: "green", value: "?color=green", label: "Green" },
            { referenceValue: "yellow", value: "?color=yellow", label: "Yellow" },
        ],
    },
]

interface ProductFiltersProps {
    categoryName: string
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ categoryName }) => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const searchValues = Array.from(searchParams.entries())
    console.log(searchValues);

    return (
        <>
            {
                filters.map((section, index) => (
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger>
                                <span>
                                    {section.name}
                                    <span className="ml-1 text-xs font-extrabold capitalize text-gray-400">
                                        {searchParams.get(section.id)
                                            ? `(${searchParams.get(section.id)})`
                                            : ""}
                                    </span>
                                </span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    <RadioGroup className="space-y-2">
                                        {section.options.map((item) => (
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value={item.value}
                                                    id={item.label}
                                                    checked={searchValues.some(([key, value]) => (
                                                        key === section.id && value === item.referenceValue
                                                    ))}
                                                    onClick={(event) => {
                                                        const currentParams = new URLSearchParams(
                                                            Array.from(searchParams.entries())
                                                        )
                                                        const checked = event.currentTarget.dataset.state === "checked"
                                                        checked ? currentParams.delete(section.id) : currentParams.set(section.id, item.referenceValue)
                                                        router.replace(`/category/${categoryName}?${currentParams.toString()}`)
                                                    }}
                                                />
                                                <Label htmlFor={item.label}>{item.label}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))
            }
        </>
    )
}

export default ProductFilters