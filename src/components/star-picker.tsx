"use client";

import { useState } from "react";
import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
interface Props {
    className?: string;
    rating: number;
    disabled?: boolean;
    onChange: (rating: number) => void;
}

export const StarPicker = ({ className, rating, disabled, onChange }: Props) => {
    const [hoverValue, setHoverValue] = useState(0);
    return (
        <div
        className={cn(
            "flex items-center gap-x-1",
            disabled && "cursor-not-allowed opacity-50",
            className
        )}
        >
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={disabled}
                    className={cn(
                        "p-0 hover:scale-110 transition ",
                        !disabled && "cursor-pointer",
                    )}
                    onClick={() => onChange(star)}
                    onMouseEnter={() => setHoverValue(star)}
                    onMouseLeave={() => setHoverValue(0)}
                >
                    <StarIcon
                        className={cn(
                            "size-4",
                            star <= (hoverValue || rating) ? "fill-foreground" : "text-muted-foreground",
                        )}
                    />
                </button>
            ))}
        </div>
    )

}    