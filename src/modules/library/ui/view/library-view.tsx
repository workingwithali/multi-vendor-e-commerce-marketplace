import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { ProductList, ProductListSkeleton } from "../components/product-list"
import { Suspense } from "react"

const LibraryView = () => {
  return (
    <div className="min-h-screen bg-background">
        <nav className="bg-background p-4 w-full border-b">
            <Link prefetch href="/" className="flex items-center gap-2 text-foreground">
                <ArrowLeftIcon  className="size-4"/>
                <span className="text font-medium"> continue shopping </span>
            </Link>
        </nav>
        <header className="py-8 border-b mb-8">
        <div className="container mx-auto px-4 ">
          <h1 className="text-3xl font-bold text-foreground">Your Library</h1>
          <p className="text-lg text-muted-foreground mt-2">your purchases & reviews.</p>
        </div>
        </header>
        <section className="container mx-auto px-4 ">
          <Suspense fallback={<ProductListSkeleton />} >
            <ProductList />
          </Suspense>
        </section>
    </div>
  )
}

export default LibraryView