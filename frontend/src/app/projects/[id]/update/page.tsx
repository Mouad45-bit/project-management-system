// src/app/projects/[id]/update/page.tsx

import { ProjectEditView } from "@/components/projects/ProjectEditView";

type UpdateProjectPageProps = {
    params: Promise<{
        id: string;
    }>;
    searchParams: Promise<{
        returnTo?: string;
    }>;
};

export default async function UpdateProjectPage
({
     params,
     searchParams,
}: UpdateProjectPageProps) {
    const { id } = await params;
    const { returnTo } = await searchParams;

    const defaultBackHref = `/projects/${id}?returnTo=${encodeURIComponent("/projects")}`;
    const backHref = sanitizeReturnTo(returnTo, defaultBackHref);

    return <ProjectEditView projectId={Number(id)} backHref={backHref} />;
}

function sanitizeReturnTo(value: string | undefined, fallback: string): string {
    if (!value) {
        return fallback;
    }

    if (!value.startsWith("/") || value.startsWith("//")) {
        return fallback;
    }

    return value;
}