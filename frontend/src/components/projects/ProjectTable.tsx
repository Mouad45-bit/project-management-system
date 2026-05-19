// src/components/projects/ProjectTable.tsx

"use client";

import type {ProjectListItemResponse} from "@/types/project";
import {DateRange} from "@/components/ui/DateRange";
import {ProjectStatusBadge} from "@/components/projects/ProjectStatusBadge";
import {ProjectProgressBar} from "@/components/projects/ProjectProgressBar";
import {ProjectActionButtons} from "@/components/projects/ProjectActionButtons";

type ProjectTableProps = {
    projects: ProjectListItemResponse[];
    onArchive: (projectId: number) => void;
};

export function ProjectTable({projects, onArchive}: ProjectTableProps) {
    if (projects.length === 0) {
        return (
            <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <h2 className="text-lg font-semibold text-slate-950">
                    Aucun projet trouvé
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                    Aucun projet actif ne correspond aux critères de recherche actuels.
                </p>
            </section>
        );
    }

    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] border-collapse text-left">
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
                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                            Statut
                        </th>
                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                            Avancement
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
                                <div>
                                    <p className="font-semibold text-slate-950">
                                        {project.name}
                                    </p>
                                </div>
                            </td>

                            <td className="px-5 py-4 align-middle">
                                <DateRange
                                    startDate={project.startDate}
                                    endDate={project.plannedEndDate ?? ""}
                                />
                            </td>

                            <td className="px-5 py-4 align-middle">
                                <ProjectStatusBadge status={project.status}/>
                            </td>

                            <td className="px-5 py-4 align-middle">
                                <div className="flex w-36 items-center gap-3">
                                    <div className="flex-1">
                                        <ProjectProgressBar
                                            value={project.progressPercent}
                                            showLabel={false}
                                        />
                                    </div>

                                    <span className="w-9 text-right text-sm font-bold text-slate-950">
                                        {project.progressPercent}%
                                    </span>
                                </div>
                            </td>

                            <td className="px-5 py-4 align-middle">
                                <ProjectActionButtons
                                    projectId={project.id}
                                    onArchive={onArchive}
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