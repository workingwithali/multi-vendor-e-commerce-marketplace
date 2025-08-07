
import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface Props {
    minPrice?: string | null;
    maxPrice?: string | null;
    onMinPriceChange: (value: string) => void;
    onMaxPriceChange: (value: string) => void;
}

export const formatAsCurrency = (value: string): string => {
    // Remove all characters except digits and dot
    const cleaned = value.replace(/[^\d.]/g, '');

    // Parse float value
    const numberValue = parseFloat(cleaned);

    // Return empty string if invalid number
    if (isNaN(numberValue)) return '';

    // Format as PKR currency
    return new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(numberValue);
};

export const PriceFilter = ({ minPrice, maxPrice, onMinPriceChange, onMaxPriceChange }: Props) => {
    const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const numericValue = event.target.value.replace(/[^0-9.]/g, '');
        onMinPriceChange(numericValue);
    };

    const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const numericValue = event.target.value.replace(/[^0-9.]/g, '');
        onMaxPriceChange(numericValue);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2" >
                <Label>Min Price</Label>
                <Input
                    placeholder="PKR0.00"
                    type="text"
                    value={minPrice ? formatAsCurrency(minPrice) : ''}
                    onChange={handleMinPriceChange}
                />
            </div>
            <div className="flex flex-col gap-2" >
                <Label>Max Price</Label>
                <Input
                    placeholder="∞"
                    type="text"
                    value={maxPrice ? formatAsCurrency(maxPrice) : ''}
                    onChange={handleMaxPriceChange}
                />
            </div>
        </div>
    );
};