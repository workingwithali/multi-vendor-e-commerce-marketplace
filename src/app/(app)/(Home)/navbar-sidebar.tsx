import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle

 } from "@/components/ui/sheet";
 import { ScrollArea } from "@/components/ui/scroll-area";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface props {
  item: NavbarItem[];
  open : boolean;
  onOpenChange : (open : boolean) => void;
}

export const NavbarSidebar = ({item, open, onOpenChange} : props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1">
          {item.map((item) => (
            <div key={item.href}>{item.children}</div>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};