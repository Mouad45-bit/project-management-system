// src/app/projects/create/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { createProject } from "@/services/projectApi";
import type { ProjectCreateRequest } from "@/types/project";

export default function CreateProjectPage() {
    const router = useRouter();

    async function handleCreateProject(payload: ProjectCreateRequest) {
        const createdProject = await createProject(payload);
        router.push(
            `/projects/${createdProject.id}?returnTo=${encodeURIComponent("/projects")}`,
        );
    }

    return (
        <>
            <PageHeader
                eyebrow="Création"
                title="Nouveau projet"
                description="Créez un projet, définissez sa planification initiale et désignez les membres qui participeront à sa réalisation."
                showBackButton
                backHref="/projects"
                backLabel="Retour aux projets"
            />

            <ProjectForm
                mode="create"
                cancelHref="/projects"
                onSubmit={handleCreateProject}
            />
        </>
    );
}