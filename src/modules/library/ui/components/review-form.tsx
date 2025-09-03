import { Button } from "@/components/ui/button";
import { ReviewGetOneOutput } from "@/modules/reviews/types";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";


interface Props{
    productId: string,
    initialData?: ReviewGetOneOutput
}
export const ReviewForm = ({ productId, initialData }: Props) => {
    return (
        <div>
            reviews types
        </div>
    )
}