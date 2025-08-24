import { Button } from '@/components/ui/button';
import { cn, formatCurrency } from '@/lib/utils';
import React from 'react'

interface Props {
    total: number;
    onCheckout: () => void
    isCanceled?: boolean
    isPending?: boolean
}

export const CheckoutSidebar = ({ total, onCheckout, isCanceled, isPending }: Props) => {
    return (
        <div className='border rounded-sm flex flex-col overflow-hidden bg-background'>
            <div className='flex items-center justify-between p-4 border-b'>
                <h4 className='font-medium text-foreground text-xl'>Total</h4>
                <p className='font-medium text-foreground text-xl'>{formatCurrency(total)}</p>
            </div>
            <div className='p-4 flex items-center justify-center'>
                <Button
                    variant="ghostOutline"
                    disabled={isPending}
                    onClick={onCheckout}
                    className={cn(
                        "h-9  w-full rounded-sm bg-foreground text-background text-sm font-medium transition-shadow duration-200",
                        "border border-foreground  shadow-none hover:bg-primary hover:shadow-sm shadow-foreground"
                    )}
                >
                    Checkout
                </Button>
            </div>

        </div>
    )
}
