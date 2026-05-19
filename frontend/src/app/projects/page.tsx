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
                eyebrow="Module Gestion des projets"
                title="Gestion des projets"
                description="Créez, suivez et pilotez vos projets."
            />

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