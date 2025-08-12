"use client"
import { useTRPC } from '@/trpc/client';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import React from 'react'
import { useProductFilters } from '../../hooks/use-porduct-filters';
import { ProductCard, ProductCardSkeleton } from './product-card';
import { DEFAULT_LIMIT } from '@/constants';
import { Button } from '@/components/ui/button';
import { InboxIcon } from 'lucide-react';

interface Props {
  category?: string
}

export const ProductList = ({ category }: Props) => {
  const [filter] = useProductFilters();
  const trpc = useTRPC();
  const { data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useSuspenseInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
    {
      ...filter,
      category,
      limit: DEFAULT_LIMIT
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.docs.length > 0 ? lastPage.nextPage : undefined
      }
    }

  ));
  if (data?.pages?.[0]?.docs.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center text-2xl font-semibold border border-foreground py-8 border-dashed gap-y-4 bg-background w-full rounded-lg'>
        <InboxIcon />
        <p className='text-base font-medium'>No products found</p>
        </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 ">
        {data?.pages.flatMap((page) => page.docs).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.image?.url}
            anuthorUserName="ali rashid"
            anuthorImageUrl={undefined}
            reviewRating={3}
            reviewCount={5}
            price={product.price}
          />
        ))}
      </div>
      <div className='flex justify-center my-8'>
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className='font-medium disabled:opacity-50 text-base bg-foreground text-background'
          >
            {isFetchingNextPage
              ? "Loading more..."
              : "Load More"}
          </Button>
        )}
      </div>
    </>

  )
}


export const ProductListSkeleton = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 '>
      {Array.from({ length: 12 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
