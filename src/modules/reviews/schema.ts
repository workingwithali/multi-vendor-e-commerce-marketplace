import { z } from "zod"



export const formSchema = z.object({
    rating: z.number().min(1, { message: "Rating is required" }).max(5),
    comment: z.string().min(1, { message: "Comment is required" }).max(500),
})