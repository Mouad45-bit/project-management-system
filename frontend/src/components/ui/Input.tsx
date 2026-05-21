// src/components/ui/Input.tsx

import { cn } from "@/lib/classNames";
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={cn(
                "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-sm placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100",
                className,
            )}
            {...props}
        />
    );
}