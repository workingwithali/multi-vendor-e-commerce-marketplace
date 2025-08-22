import { CheckoutView } from '@/modules/checkout/ui/views/checkout-view'
import React from 'react'
interface Props {
  params: Promise<{ slug: string }>
}


const page = async ( { params }: Props) => {
  const { slug } = await params
  return <CheckoutView tenantSlug={slug} />
}

export default page