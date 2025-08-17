"use client";
import { generateTenantsUrl } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";



interface Props {
    slug: string
}

export const Navbar = ({ slug }: Props) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));
    return (
        <nav className='h-16 border-b font-medium bg-background'>
            <div className='max-w-(--breakpoint-xl) mx-auto flex items-center justify-between h-full px-4 lg:px-8'>
                <Link href={generateTenantsUrl(slug)}>
                {data.image?.url &&
                 <Image
                    src={data.image.url}
                    alt={slug}
                    width={32}
                    height={32}
                    className='rounded-full border skrink-0 size-[32px]'
                />
                }
                    <p className='text-xl font-semibold'>{data?.name}</p>
                </Link>
            </div>
        </nav>
    )
}
export const NavbarSkeleton = () => {
    return (
        <nav className='h-16 border-b font-medium bg-background'>
            <div className='max-w-(--breakpoint-xl) mx-auto flex items-center justify-between h-full px-4 lg:px-8'>
            </div>
        </nav>
    )
}