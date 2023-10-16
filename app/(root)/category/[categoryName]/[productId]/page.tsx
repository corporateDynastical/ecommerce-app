import { redirect } from "next/navigation";

import ProductGallary from "@/components/ui/product-gallary";
import ProductInfo from "@/components/ui/product-info";

interface ProductPageProps {
  params: { productId: string };
}

export default async function ProductPage({ params }: ProductPageProps) {

  if (!params.productId) {
    redirect(`/`)
  }

  const product = await fetch(`http://localhost:3000/api/products/${params.productId}`)
  const product_data = await product.json()
  const current_product = product_data.product
  // console.log(current_product);

  return (
    <main className="mx-auto max-w-5xl sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="pb-20 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
          <ProductGallary product={current_product} />
          <ProductInfo product={current_product} />
        </div>
      </div>
    </main>
  )
}