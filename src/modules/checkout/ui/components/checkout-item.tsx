interface Props {
  isLast?: boolean;
  id: string;
  name: string;
  tenantName: string;
  imageUrl?: string;
  tenantUrl: string;
  productUrl: string;
  price: number;
  onRemove: () => void
}

import { cn } from '@/lib/utils';
import React from 'react'

export const CheckoutItems = ( { isLast, id, name, tenantName, imageUrl, tenantUrl, productUrl, price, onRemove }: Props) => {
  return (
    <div className={cn("grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b", isLast && "border-b-0")}>
      CheckoutItems
    </div>
  )
}
