import { Navbar } from "@/app/(app)/(Home)/navbar"
import { Footer } from "@/app/(app)/(Home)/footer"
import { SearchFilter } from "@/app/(app)/(Home)/search-filter"

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Category } from "@/payload-types"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = async({ children }: LayoutProps) => {
  const payload = await getPayload({
    config: configPromise,
  })
  const data = await payload.find({
    collection: 'categories',
    depth: 1,
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
  });
  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs??[]).map((subdoc) => ({
      ...(subdoc as Category),
    })),
  }));
  // console.log('Categories:', formattedData);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilter data={formattedData}/>
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
