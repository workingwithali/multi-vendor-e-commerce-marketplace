import { Footer } from "@/modules/tenants/ui/components/footer"
import { Navbar } from "@/modules/tenants/ui/components/navbar"





interface LayoutProps {
    children: React.ReactNode,
    params: { slug: string }
}

const layout = ( { children  }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-muted flex flex-col">
     <Navbar />
    <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">
        {children}
        </div>
    </div>
    <Footer />
    </div>
  )
}

export default layout