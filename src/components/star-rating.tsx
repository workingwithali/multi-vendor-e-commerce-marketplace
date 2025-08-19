import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";


const maxRating = 5;
const minRating = 0;

interface StarRatingProps {
    rating: number;
    className?: string;
    iconClassName?: string;
    text?: string;
}

export function StarRating({ rating, className, iconClassName, text }: StarRatingProps) {
    const safeRating = Math.max(Math.min(rating, maxRating), minRating);

    return (

        <div className={cn("flex items-center gap-x-1", className)}>
           {Array.from({length: maxRating}).map((_, index) => (
               <StarIcon 
               key={index} 
               className={cn(
                "size-4", 
                index < safeRating ? "fill-foreground" : "text-muted-foreground",
                iconClassName)}
             />
           ))
           }

           {text && <p className="text-muted-foreground text-sm">{text}</p>}
           
        </div>
    
    
    )
}