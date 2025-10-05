"use client"
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";


const Page = () => {
  const trpc = useTRPC();
  const {mutate: verify} = useMutation(trpc.checkout.verify.mutationOptions({
    onSuccess(data) {
      window.location.href = data.url;
    },
    onError(error) {
      window.location.href = '/';
    }
  }));
  useEffect(() => {
    verify();
  }, [verify])
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoaderIcon className="animate-spin size-4 text-muted-foreground" />
    </div>
  )
}

export default Page