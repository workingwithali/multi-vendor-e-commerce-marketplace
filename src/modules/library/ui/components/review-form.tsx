import { ReviewGetOneOutput } from "@/modules/reviews/types";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";


import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formSchema } from "@/modules/reviews/schema";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { StarPicker } from "@/components/star-picker";
import { useMutation } from "@tanstack/react-query";


interface Props {
    productId: string,
    initialData?: ReviewGetOneOutput
}
export const ReviewForm = ({ productId, initialData }: Props) => {
    const trpc = useTRPC();
    const createReview = useMutation(trpc.reviews.create.mutationOptions({
        onSuccess: ()=>{},
        onError: ()=>{},
    }));
    const updateReview = useMutation(trpc.reviews.update.mutationOptions({
        onSuccess:()=>{},
        onError:()=>{}
    }));
    const [isPreview, setIsPreview] = useState(!!initialData);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: initialData?.rating ?? 0,
            comment: initialData?.comment ?? "",
        },
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if(initialData){
            updateReview.mutate({
                reviewsId:initialData.id,
                rating: values.rating,
                comment: values.comment
            })          
        }else{
            createReview.mutate({
                productId,
                rating:values.rating,
                comment:values.comment
            })
        }
    }
    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-4"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <p>
                    {isPreview ? "Preview" : "Liked it? Give us a review!"}
                </p>
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <StarPicker
                                    disabled={isPreview}
                                    rating={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Write your review here..."
                                    disabled={isPreview}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {!isPreview && (

                    <Button
                        variant="ghostOutline"
                        disabled={false}
                        type="submit"
                        size="lg"
                        className="bg-foreground text-background hover:bg-primary hover:text-foreground w-fit"

                    >
                {initialData ? "Updata review" : "Post review"}
                    </Button>
                )}
                {isPreview && (
                    <Button
                     onClick={() => setIsPreview(false)}
                     variant="ghostOutline"
                     disabled={false}
                     type="button"
                     size="lg"
                     className="w-fit border border-foreground hover:bg-foreground hover:text-background"
                     >
                        Edit
                    </Button>
                )}

            </form>
        </Form>
    )
}