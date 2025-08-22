"use client";
import { generateTenantsUrl } from "@/lib/utils";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    weight: "600",
    subsets: ["latin"],
})

interface Props {
    slug: string
}

export const Navbar = ({ slug }: Props) => {

    return (
        <nav className='h-16 border-b font-medium bg-background'>
            <div className='max-w-(--breakpoint-xl) mx-auto flex items-center justify-between h-full px-4 lg:px-8'>
                <p className="2xl">CheckOut </p>
                <Button
                    variant={"ghostOutline"}
                    className={cn(
                        "h-9 px-4 w-auto rounded-sm text-sm font-medium transition-shadow duration-200",
                        "border border-foreground  shadow-none hover:shadow-sm shadow-foreground",
                    )}
                >
                    <Link href={generateTenantsUrl(slug)}>
                        <span className={cn(" font-medium", poppins.className)}>
                            Continue Shopping
                        </span>
                    </Link>
                </Button>
            </div>
        </nav>
    )
}
