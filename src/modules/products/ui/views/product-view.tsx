"use client";
import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, generateTenantsUrl } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LinkIcon, StarIcon } from "lucide-react";
import Image from "next/image"
import Link from "next/link";
import { Fragment } from "react";


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
                <div className="relative aspect-square lg:aspect-[4/2] border-b">
                    <Image
                        src={data.image?.url || "/placeholder.png"}
                        alt={data.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-6">
                    {/* product details */}
                    <div className="col-span-4">
                        <div className="p-4">
                            <h1 className="text-4xl font-medium">{data.name}</h1>
                        </div>
                        <div className="border-y flex">
                            <div className="px-6 py-4 flex items-center justify-center border-r">
                                <div className="relative px-2 py-1 border bg-primary border-foreground w-fill">
                                    <p className="text-base font-semibold">{formatCurrency(data.price)}</p>
                                </div>
                            </div>
                            <div className="px-6 py-4 flex items-center justify-center lg:border-r  ">
                                <Link href={generateTenantsUrl(tenantSlug)} className="flex items-center gap-2">
                                    <Image
                                        src={data.tenant.image?.url || "/placeholder.png"}
                                        alt={data.tenant.name}
                                        width={20}
                                        height={20}
                                        className="rounded-full border shrink-0 size-[20px]"
                                    />
                                    <p className="text-sm font-medium">{data.tenant.name}</p>
                                </Link>
                            </div>
                            <div className="hidden lg:flex items-center justify-center px-6 py-4">
                                <div className="flex items-center gap-1">
                                    <StarRating rating={4}  iconClassName="size-4" />
                                    <p className="text-sm font-medium">{4}rating</p>
                                </div>
                            </div>
                        </div>
                        <div className="block lg:hidden px-6 py-4 items-center justify-center border-b">
                            <div className="flex items-center gap-1">
                                <StarRating
                                    rating={4}
                                    text="dfdafads"
                                    iconClassName="size-4"
                                />
                                <p className="text-sm font-medium">{4}rating</p>
                            </div>
                        </div>
                        <div className="p-6">
                            {data.description ? (
                                <p className="text-muted-foreground">{data.description}</p>
                            ) : (
                                <p className="text-muted-foreground font-medium italic">No description available</p>
                            )
                            }
                        </div>


                    </div>
                    {/* right side content */}
                    <div className="col-span-2 ">
                        <div className="border-t lg:border-t-0 lg:border-l h-full">
                            {/* Add to cart */}
                            <div className="flex flex-col gap-4 p-6 border-b">
                                <div className="flex flex-row items-center gap-2">
                                    <Button
                                        variant="ghostOutline"
                                        className="flex-1 bg-primary hover:bg-foreground text-background hover:text-background px-6 border-foreground rounded-sm "
                                    >
                                        Add to cart
                                    </Button>
                                    <Button
                                        className="size-9 rounded-sm"
                                        variant="ghostOutline"
                                        onClick={() => { }}
                                        disabled={false}
                                    >
                                        <LinkIcon className="size-6" />
                                    </Button>
                                </div>
                                <p className="text-center font-medium">
                                    {data["refund policy"] === "no-refund" ? (
                                        "No refund policy available"
                                    ) : (
                                        `${data["refund policy"]} money back guarantee`
                                    )}
                                </p>
                            </div>
                            {/* Ratings */}
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold">Ratings</h3>
                                    <div className="flex items-center gap-x-1 font-medium">
                                        <StarIcon className="size-4 fill-foreground" />
                                        <p>({5})</p>
                                        <p className="text-base">{5} ratings </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[auto_1fr_auto] gap-3 mt-4 items-center">
                                    {[5, 4, 3, 2, 1].map((stars) => (
                                        <div key={stars} className="contents ">
                                            {/* Left side: stars */}
                                            <div className="font-medium">
                                                {stars} {stars === 1 ? "star" : "stars"}
                                            </div>

                                            {/* Middle: progress bar */}
                                            <Progress value={stars * 20} className="h-[1lh] rounded-sm" />

                                            {/* Right side: percentage */}
                                            <div className="font-medium">
                                                {stars * 20}%
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
