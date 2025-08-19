"use client";
import { formatCurrency } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image"

interface Props {
    tenantSlug: string,
    prodcutId: string,
}

export const ProductView = ({ tenantSlug, prodcutId }: Props) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.products.getOne.queryOptions({ id: prodcutId }));
    return (
        <div className="px-4 lg:px-12 py-8">
            <div className="border rounded-sm bg-background overflow-hidden">
                <div className="relative aspect-[3.9] border-b">
                    <Image
                        src={data.image?.url || "/placeholder.png"}
                        alt={data.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-6">
                    <div className="col-span-4">

                        <div className="p-4">
                            <h1 className="text-4xl font-medium">{data.name}</h1>
                        </div>
                        <div className="border-y flex">
                            <div className="px-6 py-4 flex items-center justify-center border-r">
                                <div className="relative px-2 py-1 borer bg-pink-400 w-fill">
                                    <p className="text-base font-semibold">PKR {formatCurrency(data.price)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
