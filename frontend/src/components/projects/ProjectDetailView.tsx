// src/components/projects/ProjectDetailView.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    CalendarDays,
    Hash,
    Pencil,
    UsersRound,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DateRange } from "@/components/ui/DateRange";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";
import { ProjectSummaryCards } from "@/components/projects/ProjectSummaryCards";
import { ProjectTaskOverview } from "@/components/projects/ProjectTaskOverview";
import { ProjectTeamPanel } from "@/components/projects/ProjectTeamPanel";
import { getProjectById } from "@/services/projectApi";
import type { ProjectDetailResponse } from "@/types/project";

type ProjectDetailViewProps = {
    projectId: number;
    backHref: string;
};

export function ProjectDetailView({ projectId, backHref }: ProjectDetailViewProps) {
    const [project, setProject] = useState<ProjectDetailResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        async function loadProject() {
            setIsLoading(true);
            const response = await getProjectById(projectId);

            if (isActive) {
                setProject(response);
                setIsLoading(false);
            }
        }

        void loadProject();

        return () => {
            isActive = false;
        };
    }, [projectId]);

    if (isLoading) {
        return (
            <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <p className="text-sm font-medium text-slate-500">
                    Chargement du projet...
                </p>
            </section>
        );
    }

    if (!project) {
        return (
            <>
                <PageHeader
                    eyebrow="Projet introuvable"
                    title="Aucun projet trouvé"
                    description="Le projet demandé n’existe pas dans les données actuelles."
                    showBackButton
                    backHref="/projects"
                    backLabel="Retour aux projets"
                />

                <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                    <p className="text-sm font-medium text-slate-500">
                        Vérifiez l’identifiant du projet ou revenez à la liste.
                    </p>
                </section>
            </>
        );
    }

    return (
        <>
            <PageHeader
                eyebrow={project.code}
                title={project.name}
                description="Tableau de bord du projet : informations générales, avancement, tâches, équipe et accès vers les modules associés."
                showBackButton
                backHref={backHref}
                backLabel="Retour"
                actions={
                    !project.archived ? (
                        <Link
                            href={`/projects/${project.id}/update?returnTo=${encodeURIComponent(
                                `/projects/${project.id}?returnTo=${encodeURIComponent(backHref)}`,
                            )}`}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            <Pencil size={17} className="text-white" />
                            <span className="text-white">Modifier</span>
                        </Link>
                    ) : null
                }
            />

            <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div>
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                        <ProjectStatusBadge status={project.status} />

                        {project.archived ? (
                            <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                Archivé
                            </span>
                        ) : null}
                    </div>

                    <p className="w-full text-sm leading-7 text-slate-600">
                        {project.description ?? "Aucune description renseignée."}
                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <InfoItem
                            icon={<Hash size={18} />}
                            label="Code projet"
                            value={project.code}
                        />

                        <InfoItem
                            icon={<CalendarDays size={18} />}
                            label="Période"
                            value={
                                <DateRange
                                    startDate={project.startDate}
                                    endDate={project.plannedEndDate ?? ""}
                                />
                            }
                        />

                        <InfoItem
                            icon={<UsersRound size={18} />}
                            label="Membres"
                            value={`${project.membersCount} membre${
                                project.membersCount > 1 ? "s" : ""
                            }`}
                        />
                    </div>
                </div>
            </section>

            <div className="mb-6">
                <ProjectSummaryCards summary={project.summary} />
            </div>

            <div className="grid items-stretch gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
                <ProjectTaskOverview
                    tasks={project.taskOverview}
                    className="h-[640px]"
                />

                <ProjectTeamPanel
                    members={project.members}
                    className="h-[640px]"
                />
            </div>
        </>
    );
}

function InfoItem
({
     icon,
     label,
     value,
}: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                {icon}
            </div>

            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {label}
            </p>

            <div className="mt-1 text-sm font-semibold text-slate-950">
                {value}
            </div>
        </div>
    );
}