// src/app/projects/page.tsx

"use client";

import { useCallback, useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import type { ProjectStatusFilter } from "@/components/projects/ProjectFilters";
import { ProjectTable } from "@/components/projects/ProjectTable";
import {
    archiveProject,
    getProjects,
} from "@/services/projectApi";
import type { PageResponse } from "@/types/api";
import type { ProjectListItemResponse } from "@/types/project";
import Link from "next/link";
import {Archive, Plus} from "lucide-react";

export default function ProjectsPage() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<ProjectStatusFilter>("ALL");
    const [projectsPage, setProjectsPage] =
        useState<PageResponse<ProjectListItemResponse> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadProjects = useCallback(async () => {
        setIsLoading(true);

        const response = await getProjects({
            search,
            status,
            archived: false,
            page: 0,
            size: 10,
        });

        setProjectsPage(response);
        setIsLoading(false);
    }, [search, status]);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            void loadProjects();
        }, 0);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [loadProjects]);

    async function handleArchive(projectId: number) {
        const confirmed = window.confirm(
            "Voulez-vous vraiment archiver ce projet ?",
        );

        if (!confirmed) {
            return;
        }

        await archiveProject(projectId);
        await loadProjects();
    }

    return (
        <>
            <PageHeader
                title="Gestion des projets"
                description="Créez, suivez et pilotez vos projets. Cette interface affiche les projets actifs avec recherche, filtrage, avancement et actions principales."
            />

            <div className="-mt-8 mb-3 flex flex-wrap items-center justify-end gap-3">
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

            <ProjectFilters
                search={search}
                status={status}
                totalElements={projectsPage?.totalElements ?? 0}
                onSearchChange={setSearch}
                onStatusChange={setStatus}
            />

            {isLoading ? (
                <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Chargement des projets...
                    </p>
                </section>
            ) : (
                <ProjectTable
                    projects={projectsPage?.content ?? []}
                    onArchive={handleArchive}
                />
            )}
        </>
    );
}