import Link from "next/link"
import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import { Button } from "@/components/ui/button"

interface NavbarItemProps {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
}
const NavbarItem = ({
    href,
    children,
    isActive,
}: NavbarItemProps) => {
    return(
        <Button>
            {children}
        </Button>
    )
}
const poppins = Poppins({
    weight: ["700"],
    subsets: ["latin"],
})

export const Navbar = () => {
  return (
    <nav className="h-20 flex border-b justify-between font-medium text-white">
        <Link href="/" className="flex items-center pl-6">
            <span className={cn("text-5xl font-semibold", poppins.className)}>LOGO</span>
        </Link>
    </nav>
  )
}
