import { RefObject } from "react";

export const useDropdownPosition = (
    Ref: RefObject<HTMLDivElement | null> | RefObject<HTMLButtonElement>,
) => {
    const getdropdownPosition = () => {
        if (!Ref.current) {
            return { top: 0, left: 0 };
        }
        const rect = Ref.current.getBoundingClientRect();
        const dropdownWith = 240;

        let left = rect.left + window.scrollX;
        let top = rect.bottom + window.scrollY;

        if (rect.left + dropdownWith > window.innerWidth) {
            left = rect.left + window.scrollX - dropdownWith; // 16px for padding
            if (left < 0) {
                left = window.innerWidth - dropdownWith - 16; 
            }
        }
        if(left < 0) {
            left = 0; // Ensure left is not negative
        }
        return { top, left };
    };
    return { getdropdownPosition };
};