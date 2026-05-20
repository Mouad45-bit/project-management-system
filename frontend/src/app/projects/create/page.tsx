// src/app/projects/create/page.tsx

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { createProject } from "@/services/projectApi";
import type { ProjectCreateRequest } from "@/types/project";

export default function CreateProjectPage() {
    const router = useRouter();

    async function handleCreateProject(payload: ProjectCreateRequest) {
        const createdProject = await createProject(payload);
        router.push(`/projects/${createdProject.id}`);
    }

    return (
        <>
            <PageHeader
                eyebrow="Création"
                title="Nouveau projet"
                description="Créez un projet, définissez sa planification initiale et désignez les membres qui participeront à sa réalisation."
                actions={
                    <Link
                        href="/projects"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        <ArrowLeft size={17} />
                        Retour aux projets
                    </Link>
                }
            />

            <ProjectForm
                mode="create"
                cancelHref="/projects"
                onSubmit={handleCreateProject}
            />
        </>
    );
}