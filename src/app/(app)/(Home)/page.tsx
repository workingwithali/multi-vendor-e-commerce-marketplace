"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";



const Home =  () => {
  const trpc = useTRPC();
  const categories =  useQuery(trpc.auth.session.queryOptions());

  return (
    <div>
      <p className="bg-amber-300">is loading:{categories.isLoading}</p>
      {JSON.stringify(categories.data?.user, null, 2)}
    </div>
  )
}

export default Home
