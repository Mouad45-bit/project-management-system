// src/components/ui/PageHeader.tsx

import type { ReactNode } from "react";

type PageHeaderProps = {
    eyebrow?: string;
    title: string;
    description?: string;
    actions?: ReactNode;
};

export function PageHeader
({
     eyebrow,
     title,
     description,
     actions,
}: PageHeaderProps) {
    return (
        <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
                {eyebrow ? (
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                        {eyebrow}
                    </p>
                ) : null}

                <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                    {title}
                </h1>

                {description ? (
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                        {description}
                    </p>
                ) : null}
            </div>

            {actions ? (
                <div className="flex flex-wrap items-center gap-3">{actions}</div>
            ) : null}
        </header>
    );
}