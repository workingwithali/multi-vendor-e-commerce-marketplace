"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle";
import { usePathname } from "next/navigation"
import { NavbarSidebar } from "./navbar-sidebar"
import { useState } from "react"
import { MenuIcon } from "lucide-react"


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
    return (
        <Button
            asChild
            variant="outline"
            className={cn(
                "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
                "rounded-full p-3.5 text-lg text-foreground",
                isActive && [
                    "bg-foreground text-background hover:bg-foreground hover:text-background",
                    "dark:bg-accent dark:text-accent-foreground dark:hover:bg-accent/80 dark:hover:text-accent-foreground"
                ]
            )}
        >
            <Link href={href}>{children}</Link>
        </Button>

    )
}
const navbarItems = [
    { href: "/", children: "Home" },
    { href: "/about", children: "About" },
    { href: "/pricing", children: "Pricing" },
    { href: "/features", children: "Features" },
    { href: "/contact", children: "Contact" },
]
const poppins = Poppins({
    weight: ["700"],
    subsets: ["latin"],
})


export const Navbar = () => {
    const pathname = usePathname();
    const [isSiderOpen, setIsSiderOpen] = useState(false);

    return (
        <nav className="h-20 flex border-b justify-between items-center font-medium text-foreground">
            <Link href="/" className="flex items-center pl-6">
                <span className={cn("text-5xl font-semibold", poppins.className)}>LOGO</span>
            </Link>
            <NavbarSidebar
                item={navbarItems}
                open={isSiderOpen}
                onOpenChange={setIsSiderOpen}
            />
            <div className="items-center gap-4 hidden lg:flex">
                {navbarItems.map((item) => (
                    <NavbarItem key={item.href} href={item.href} isActive={item.href === pathname}>{item.children}</NavbarItem>
                ))}
            </div>
                <ModeToggle  />
            <div className="hidden lg:flex h-full">

                <Button
                    asChild
                    variant="secondary"
                    className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-background text-foreground hover:bg-primary hover:text-accent-foreground  transition-colors"
                >
                    <Link href="/sign-in">Log In</Link>
                </Button>

                <Button
                    asChild
                    className="border-l border-foreground border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-foreground text-background hover:bg-primary hover:text-accent-foreground  transition-colors"
                >
                    <Link href="/sign-up">Start Selling</Link>
                </Button>
            </div>
            <div className="flex lg:hidden items-center justify-center">
                <Button variant="ghost"
                    className="size-12 border-transparent bg-background"
                    onClick={() => setIsSiderOpen(true)}
                >
                    <MenuIcon />
                </Button>
            </div>

        </nav>
    )
}
