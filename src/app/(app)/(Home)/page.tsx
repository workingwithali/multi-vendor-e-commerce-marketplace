"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";



const Home =  () => {
  const trpc = useTRPC();
  const categories =  useQuery(trpc.category.getMany.queryOptions())

  return (
    <div>
      <p>is loading:{categories.isLoading}</p>
      {JSON.stringify(categories.data, null, 2)}
    </div>
  )
}

export default Home
