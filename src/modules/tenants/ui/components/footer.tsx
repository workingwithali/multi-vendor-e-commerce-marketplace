import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import Link from "next/link"

const poppins = Poppins({
    weight: ["700"],
    subsets: ["latin"],
})

export const Navbar = () => {
    return (
        <nav className='h-16 border-b font-medium bg-background'>
            <div className='max-w-(--breakpoint-xl) mx-auto flex items-center justify-between h-full px-4 lg:px-8'>
                <p className='text-xl font-semibold'>powered by</p>
                <Link href='/'>
                    <span className={cn("text-2xl font-semibold", poppins.className)}>
                        logo
                    </span>
                </Link>
            </div>
        </nav>
    )
}
