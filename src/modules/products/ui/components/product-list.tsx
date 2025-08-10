"use client"
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'
import { useProductFilters } from '../../hooks/use-porduct-filters';
import { ProductCard } from './product-card';

interface Props {
  category?: string
}

export const ProductList = ({ category }: Props) => {
  const [filter] = useProductFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.products.getMany.queryOptions({
    ...filter,
    category
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 ">
      {data?.docs.map((product) => (
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
  )
}


export const ProductListSkeleton = () => {
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};
