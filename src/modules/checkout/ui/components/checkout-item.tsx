import { cn, formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'




interface Props {
  isLast?: boolean;
  name: string;
  tenantName: string;
  imageUrl?: string|null;
  tenantUrl: string;
  productUrl: string;
  price: number;
  onRemove: () => void
}

export const CheckoutItems = ( { isLast, name, tenantName, imageUrl, tenantUrl, productUrl, price, onRemove }: Props) => {
  return (
    <div className={cn("grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b", isLast && "border-b-0")}>
      <div  className='overflow-hidden border-r'>
        <div className='relative aspect-square h-full'>
            <Image
                src={imageUrl || "/placeholder.png"}
                alt={name}
                fill
                className="object-cover"
            />
        </div>
      </div>
      <div className='flex flex-col justify-between py-4'>
        <div>
          <Link href={productUrl} >
          <h4 className='font-bold'>
          {name}
          </h4>
          </Link>
          <Link href={tenantUrl} >
          <p className='font-medium underline text-sm'>
          {tenantName}
          </p>
          </Link>
        </div>
      </div>
      <div className='flex flex-col justify-between py-4'>
          <p className='text-sm font-bold'>
          {formatCurrency(price)}
          </p>
          <button onClick={onRemove} className='text-sm font-medium underline cursor-pointer'>
          Remove
        </button>
      </div>
    </div>
  )
}
