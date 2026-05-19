// src/components/ui/Card.tsx

import { cn } from "@/lib/classNames";
import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};

export function Card
({
     children,
     className,
     ...props
}: CardProps) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}