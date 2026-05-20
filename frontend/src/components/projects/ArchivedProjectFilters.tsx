// src/components/projects/ArchivedProjectFilters.tsx

"use client";

import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

type ArchivedProjectFiltersProps = {
    search: string;
    totalElements: number;
    onSearchChange: (value: string) => void;
};

export function ArchivedProjectFilters
({
     search,
     totalElements,
     onSearchChange,
}: ArchivedProjectFiltersProps) {
    return (
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="relative flex-1">
                    <Search
                        size={16}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <Input
                        value={search}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Rechercher un projet archivé par nom ou code..."
                        className="pl-10"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600">
                        {totalElements} projet{totalElements > 1 ? "s" : ""} archivé
                        {totalElements > 1 ? "s" : ""}
                    </div>

                    <Link
                        href="/projects"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        <ArrowLeft size={17} />
                        Projets actifs
                    </Link>
                </div>
            </div>
        </section>
    );
}