import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";

import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  item: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ item, open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="flex flex-col">
            {item.map((navItem) => (
              <Link
                key={navItem.href}
                href={navItem.href}
                className="w-full text-left px-4 py-2 hover:bg-foreground hover:text-background flex items-center text-base font-medium"
                onClick={() => onOpenChange(false)}
              >
                {navItem.children}
              </Link>
            ))}

            <div className="border-t mt-2 pt-2">
              <Link
                href="/sign-in"
                className="w-full text-left px-4 py-2 hover:bg-foreground hover:text-background flex items-center text-base font-medium"
                onClick={() => onOpenChange(false)}
              >
                Log In
              </Link>
              <Link
                href="/sign-up"
                className="w-full text-left px-4 py-2 hover:bg-foreground hover:text-background flex items-center text-base font-medium"
                onClick={() => onOpenChange(false)}
              >
                Start Selling
              </Link>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
