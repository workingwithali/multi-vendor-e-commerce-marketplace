import { Navbar } from "@/app/(Home)/navbar"

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({children}: LayoutProps ) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />
      {children}
    </div>
  )
}

export default Layout
