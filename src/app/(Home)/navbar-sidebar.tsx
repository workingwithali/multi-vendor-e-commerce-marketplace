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

interface props {
  item: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ item, open, onOpenChange }: props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center">
            <SheetTitle>Menu</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2 ">
          {item.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-full text-left px-4  hover:bg-foreground hover:text-background flex items-center text-base font-medium "
              onClick={() => onOpenChange(false)}
            >
              {item.children}
            </Link>
          ))}
          <div className="border-t">
              <Link 
              href="/sign-in"
              className="w-full text-left px-4 hover:bg-foreground hover:text-background flex items-center text-base font-medium "
              onClick={() => onOpenChange(false)}
              >
                Log In
                </Link>
              <Link 
              href="/sign-up"
              className="w-full text-left px-4 hover:bg-foreground hover:text-background flex items-center text-base font-medium "
              onClick={() => onOpenChange(false)}
              >
                Start Selling
              </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};