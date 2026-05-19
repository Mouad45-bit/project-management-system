// src/components/projects/ProjectFilters.tsx

"use client";

import Link from "next/link";
import { Archive, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import type { ProjectStatus } from "@/types/project";
import { PROJECT_STATUS_OPTIONS } from "@/lib/statusFormat";

export type ProjectStatusFilter = ProjectStatus | "ALL";

type ProjectFiltersProps = {
    search: string;
    status: ProjectStatusFilter;
    totalElements: number;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: ProjectStatusFilter) => void;
};

export function ProjectFilters
({
     search,
     status,
     totalElements,
     onSearchChange,
     onStatusChange,
}: ProjectFiltersProps) {
    return (
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="grid flex-1 gap-3 md:grid-cols-[1fr_220px]">
                    <div className="relative">
                        <Search
                            size={16}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <Input
                            value={search}
                            onChange={(event) => onSearchChange(event.target.value)}
                            placeholder="Rechercher par nom ou code projet..."
                            className="pl-10"
                        />
                    </div>

                    <select
                        value={status}
                        onChange={(event) =>
                            onStatusChange(event.target.value as ProjectStatusFilter)
                        }
                        style={{ fontSize: "12px" }}
                        className="h-10 rounded-xl border border-slate-200 bg-white px-3 font-medium text-slate-700 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    >
                        <option value="ALL">Tous les statuts</option>
                        {PROJECT_STATUS_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Link
                        href="/projects/archives"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        <Archive size={17} />
                        Archives
                    </Link>

                    <Link
                        href="/projects/create"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        <Plus size={17} className="text-white" />
                        <span className="text-white">Nouveau projet</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}