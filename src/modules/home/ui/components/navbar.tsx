"use client"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import { MenuIcon } from "lucide-react"
import { Poppins } from "next/font/google"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { NavbarSidebar } from "./navbar-sidebar"

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
            variant="ghostOutline"
            className={cn(
                isActive && [
                "border-foreground  bg-foreground text-background",

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
    const trpc = useTRPC();
    const session = useQuery(trpc.auth.session.queryOptions());

    return (
        <nav className="h-16 flex border-b border-foreground bg-muted justify-between items-center font-medium text-foreground">
            {/* Reduced text size and padding */}
            <Link href="/" className="flex items-center pl-4">
                <span className={cn("text-3xl font-semibold", poppins.className)}>LOGO</span>
            </Link>

            <NavbarSidebar
                item={navbarItems}
                open={isSiderOpen}
                onOpenChange={setIsSiderOpen}
            />

            <div className="items-center gap-3 hidden lg:flex">
                {navbarItems.map((item) => (
                    <NavbarItem key={item.href} href={item.href} isActive={item.href === pathname}>
                        {item.children}
                    </NavbarItem>
                ))}
            </div>

            <ModeToggle />

            {session.data?.user ? (
                <div className="hidden lg:flex h-full">
                    {/* Reduced padding */}
                    <Button
                        asChild
                        className="border-l border-foreground border-t-0 border-b-0 border-r-0 px-8 h-full rounded-none bg-foreground text-background hover:bg-primary hover:text-accent-foreground transition-colors"
                    >
                        <Link href="/admin">Dashboard</Link>
                    </Button>
                </div>
            ) : (
                <div className="hidden lg:flex h-full">
                    <Button
                        asChild
                        variant="secondary"
                        className="border-l border-t-0 border-b-0 border-r-0 px-8 h-full rounded-none bg-background text-foreground hover:bg-primary hover:text-accent-foreground transition-colors"
                    >
                        <Link prefetch href="/sign-in">Log In</Link>
                    </Button>

                    <Button
                        asChild
                        className="border-l border-foreground border-t-0 border-b-0 border-r-0 px-8 h-full rounded-none bg-foreground text-background hover:bg-primary hover:text-accent-foreground transition-colors"
                    >
                        <Link prefetch href="/sign-up">Start Selling</Link>
                    </Button>
                </div>
            )}

            {/* Adjusted button size */}
            <div className="flex lg:hidden items-center justify-center">
                <Button
                    variant="ghost"
                    className="size-10 border-transparent bg-background"
                    onClick={() => setIsSiderOpen(true)}
                >
                    <MenuIcon />
                </Button>
            </div>
        </nav>
    )
}
