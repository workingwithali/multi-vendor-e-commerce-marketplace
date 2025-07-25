import { RefObject } from "react";

export const useDropdownPosition = (
    ref: RefObject<HTMLElement | null> |RefObject<HTMLDivElement>
) => {
    const getDropdownPosition = () => {
        if (!ref.current) {
            return { top: 0, left: 0 };
        }

        const rect = ref.current.getBoundingClientRect();
        const dropdownWidth = 240

        let left = rect.left + window.scrollX;
        const top = rect.bottom + window.scrollY;

        // Adjust if overflowing right edge
        if (rect.left + dropdownWidth > window.innerWidth) {
            left = rect.left + window.scrollX - dropdownWidth;
            if (left < 0) {
                left = window.innerWidth - dropdownWidth - 16;
            }
        }

        // Ensure it doesn't go off-screen on the left
        if (left < 0) {
            left = 0;
        }

        return { top, left };
    };

    return { getDropdownPosition };
};
