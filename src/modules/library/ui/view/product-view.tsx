"use client"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
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
        <section className="container mx-auto px-4 ">
        </section>
    </div>
  )
}

export default ProductView