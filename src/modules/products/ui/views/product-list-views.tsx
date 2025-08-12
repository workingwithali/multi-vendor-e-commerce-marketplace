import React, { Suspense } from 'react'
import { ProductSort } from '../components/product-sort'
import { ProductFilters } from '../components/product-filter'
import { ProductList, ProductListSkeleton } from '../components/product-list'

interface Props {
    category?: string
}

export const ProductListViews = ( { category }: Props) => {
  return (
     <div className="px-4 lg:px-12 py-8 flex flex-col gap-4 bg-muted">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-y-2 lg:gap-y-0 ">
          <p className="test-2xl font-semibold" >Curated for you</p>
          <ProductSort />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12 ">
          <div className="lg:col-span-2 xl:col-span-2">
            <ProductFilters />
          </div>
          <div className="lg:col-span-4 xl:col-span-6">
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList category={category} />
            </Suspense>
          </div>
        </div>
      </div>
  )
}
