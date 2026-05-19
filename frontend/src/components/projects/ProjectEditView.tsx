// src/components/projects/ProjectEditView.tsx

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Eye } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectForm } from "@/components/projects/ProjectForm";
import {
    getProjectById,
    updateProject,
} from "@/services/projectApi";
import type {
    ProjectCreateRequest,
    ProjectDetailResponse,
    ProjectUpdateRequest,
} from "@/types/project";

type ProjectEditViewProps = {
    projectId: number;
    backHref: string;
};

export function ProjectEditView({ projectId, backHref }: ProjectEditViewProps) {
    const router = useRouter();

    const [project, setProject] = useState<ProjectDetailResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [submitError, setSubmitError] = useState<string | null>(null);

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

    const initialValues = useMemo(() => {
        if (!project) {
            return undefined;
        }

        return {
            code: project.code,
            name: project.name,
            description: project.description,
            startDate: project.startDate,
            plannedEndDate: project.plannedEndDate,
            status: project.status,
            memberIds: project.members.map((member) => member.id),
        };
    }, [project]);

    async function handleUpdateProject(payload: ProjectCreateRequest) {
        setSubmitError(null);

        const updatePayload: ProjectUpdateRequest = {
            name: payload.name,
            description: payload.description,
            startDate: payload.startDate,
            plannedEndDate: payload.plannedEndDate,
            status: payload.status,
            memberIds: payload.memberIds,
        };

        const updatedProject = await updateProject(projectId, updatePayload);

        if (!updatedProject) {
            setSubmitError("Impossible de sauvegarder : le projet est introuvable.");
            return;
        }

        const detailHref =
            backHref.startsWith(`/projects/${updatedProject.id}`)
                ? backHref
                : `/projects/${updatedProject.id}?returnTo=${encodeURIComponent(backHref)}`;

        router.push(detailHref);
    }

    if (isLoading) {
        return (
            <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <p className="text-sm font-medium text-slate-500">
                    Chargement du projet...
                </p>
            </section>
        );
    }

    if (!project || !initialValues) {
        return (
            <>
                <PageHeader
                    eyebrow="Projet introuvable"
                    title="Modification impossible"
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
                title="Modifier le projet"
                description="Mettez à jour les informations générales, la planification, le statut et les membres désignés du projet."
                showBackButton
                backHref={backHref}
                backLabel="Retour"
                actions={
                    <Link
                        href={`/projects/${project.id}?returnTo=${encodeURIComponent(
                            `/projects/${project.id}/update?returnTo=${encodeURIComponent(backHref)}`,
                        )}`}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        <Eye size={17} className="text-white" />
                        <span className="text-white">Voir détail</span>
                    </Link>
                }
            />

            {project.archived ? (
                <section className="mb-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                    <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                    <p>
                        Ce projet est archivé. Dans la version backend finale, la
                        modification pourra être bloquée selon les règles métier.
                    </p>
                </section>
            ) : null}

            {submitError ? (
                <section className="mb-6 flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                    <p>{submitError}</p>
                </section>
            ) : null}

            <ProjectForm
                mode="edit"
                initialValues={initialValues}
                cancelHref={`/projects/${project.id}`}
                onSubmit={handleUpdateProject}
            />
        </>
    );
}