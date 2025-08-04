"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";



const Home =  () => {
  const trpc = useTRPC();
  const categories =  useQuery(trpc.auth.session.queryOptions());

  return (
    <div>
      {JSON.stringify(categories.data?.user, null, 2)}
    </div>
  )
}

export default Home
