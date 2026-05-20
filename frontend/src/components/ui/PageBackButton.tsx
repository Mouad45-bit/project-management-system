// src/components/ui/PageBackButton.tsx

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type PageBackButtonProps = {
    href: string;
    label?: string;
};

export function PageBackButton
({
     href,
     label = "Retour",
 }: PageBackButtonProps) {
    return (
        <Link
            href={href}
            aria-label={label}
            title={label}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
        >
            <ArrowLeft size={16} />
        </Link>
    );
}