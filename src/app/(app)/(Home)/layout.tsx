import { Footer } from "@/modules/home/ui/components/footer";
import { Navbar } from "@/modules/home/ui/components/navbar";
import { SearchFilter, SecrchFilterLoading } from "@/modules/home/ui/components/search-filter";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from "react";



interface LayoutProps {
  children: React.ReactNode
}

const Layout = async ({ children }: LayoutProps) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.categories.getMany.queryOptions(),
  );


  // console.log('Categories:', formattedData);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SecrchFilterLoading />}>
          <SearchFilter />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
