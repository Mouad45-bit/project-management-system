// src/components/projects/ArchivedProjectsView.tsx

"use client";

import { useCallback, useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArchivedProjectFilters } from "@/components/projects/ArchivedProjectFilters";
import { ArchivedProjectsTable } from "@/components/projects/ArchivedProjectsTable";
import {
    getProjects,
    restoreProject,
} from "@/services/projectApi";
import type { PageResponse } from "@/types/api";
import type { ProjectListItemResponse } from "@/types/project";

export function ArchivedProjectsView() {
    const [search, setSearch] = useState("");
    const [projectsPage, setProjectsPage] =
        useState<PageResponse<ProjectListItemResponse> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadArchivedProjects = useCallback(async () => {
        setIsLoading(true);

        const response = await getProjects({
            search,
            status: "ALL",
            archived: true,
            page: 0,
            size: 10,
        });

        setProjectsPage(response);
        setIsLoading(false);
    }, [search]);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            void loadArchivedProjects();
        }, 0);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [loadArchivedProjects]);

    async function handleRestore(projectId: number) {
        const confirmed = window.confirm(
            "Voulez-vous vraiment restaurer ce projet ?",
        );

        if (!confirmed) {
            return;
        }

        await restoreProject(projectId);
        await loadArchivedProjects();
    }

    return (
        <>
            <PageHeader
                eyebrow="Archivage"
                title="Projets archivés"
                description="Consultez les projets retirés de la liste active et restaurez-les si nécessaire."
                showBackButton
                backHref="/projects"
                backLabel="Retour aux projets actifs"
            />

            <ArchivedProjectFilters
                search={search}
                totalElements={projectsPage?.totalElements ?? 0}
                onSearchChange={setSearch}
            />

            {isLoading ? (
                <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Chargement des projets archivés...
                    </p>
                </section>
            ) : (
                <ArchivedProjectsTable
                    projects={projectsPage?.content ?? []}
                    onRestore={handleRestore}
                />
            )}
        </>
    );
}