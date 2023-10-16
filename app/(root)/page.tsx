import Carousel from "@/components/carousel";
import CategorySection from "@/components/category-sections";
import ProductGrid from "@/components/ui/product-grid";

export default async function Home() {

  const products = await fetch(`http://localhost:3000/api/products`)
  const data = await products.json()
  const current_products = data.products

  return (
    <>
      <Carousel />
      <CategorySection />
    </>
  )
}
