// src/components/projects/ArchivedProjectsTable.tsx

"use client";

import type { ProjectListItemResponse } from "@/types/project";
import { DateRange } from "@/components/ui/DateRange";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";
import { ArchivedProjectActionButtons } from "@/components/projects/ArchivedProjectActionButtons";

type ArchivedProjectsTableProps = {
    projects: ProjectListItemResponse[];
    onRestore: (projectId: number) => void;
};

export function ArchivedProjectsTable
({
     projects,
     onRestore,
}: ArchivedProjectsTableProps) {
    if (projects.length === 0) {
        return (
            <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <h2 className="text-lg font-semibold text-slate-950">
                    Aucun projet archivé
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                    Aucun projet archivé ne correspond aux critères actuels.
                </p>
            </section>
        );
    }

    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] border-collapse text-left">
                    <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                            Code
                        </th>

                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                            Nom du projet
                        </th>

                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                            Période
                        </th>

                        <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                            Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                    {projects.map((project) => (
                        <tr
                            key={project.id}
                            className="transition hover:bg-slate-50/80"
                        >
                            <td className="px-5 py-4 align-middle">
                                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                                        {project.code}
                                    </span>
                            </td>

                            <td className="px-5 py-4 align-middle">
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-slate-950">
                                        {project.name}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-2">
                                        <ProjectStatusBadge status={project.status} />

                                        <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                                Archivé
                                            </span>
                                    </div>
                                </div>
                            </td>

                            <td className="px-5 py-4 align-middle">
                                <DateRange
                                    startDate={project.startDate}
                                    endDate={project.plannedEndDate ?? ""}
                                />
                            </td>

                            <td className="px-5 py-4 align-middle">
                                <ArchivedProjectActionButtons
                                    projectId={project.id}
                                    onRestore={onRestore}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}