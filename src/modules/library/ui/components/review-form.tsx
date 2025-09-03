import { ReviewGetOneOutput } from "@/modules/reviews/types";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";


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