"use client";

import { useEffect, useState } from "react";

export default function RenderMounted({ children }: { children: React.ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return <>{children}</>;
}
