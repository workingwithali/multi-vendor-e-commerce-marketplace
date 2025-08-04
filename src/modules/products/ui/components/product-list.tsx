
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'

export const ProductList = () => {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.products.getMany.queryOptions());

  return (
    <div>
        {JSON.stringify(data, null, 2)}
    </div>
  )
}

export const productListSkeleton = () => {
  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}