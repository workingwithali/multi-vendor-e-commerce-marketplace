"use client"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { ReviewSidebar } from "../components/review-sidebar"
interface Props{
  productId: string
}
const ProductView = ( { productId }: Props ) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.library.getOne.queryOptions({productId}));
  
  return (
    <div className="min-h-screen bg-background">
        <nav className="bg-background p-4 w-full border-b">
            <Link prefetch href="/library " className="flex items-center gap-2 text-foreground">
                <ArrowLeftIcon  className="size-4"/>
                <span className="text font-medium"> back to library </span>
            </Link>
        </nav>
        <header className="py-8 border-b mb-8">
        <div className="container mx-auto px-4 ">
          <h1 className="text-3xl font-bold text-foreground">
            {data.name}
          </h1>
        </div>
        </header>
        <section className="container mx-auto px-4  ">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="p-4 border rounded-sm  gap-4 bg-card">
                <ReviewSidebar productId={productId}/>
              </div>
            </div>
            <div className="lg:col-span-5 ">
              {data.content ? 
              <p>{data.content}</p>
              :
              <p className="font-medium italic text-muted-foreground mb-4">
                No special content
              </p>
              }
            </div>

          </div>
        </section>
    </div>
  )
}

export default ProductView