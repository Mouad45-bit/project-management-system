// src/app/projects/[id]/page.tsx

import { ProjectDetailView } from "@/components/projects/ProjectDetailView";

type ProjectDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
    searchParams: Promise<{
        returnTo?: string;
    }>;
};

export default async function ProjectDetailPage
({
     params,
     searchParams,
}: ProjectDetailPageProps) {
    const { id } = await params;
    const { returnTo } = await searchParams;

    const backHref = sanitizeReturnTo(returnTo, "/projects");

    return <ProjectDetailView projectId={Number(id)} backHref={backHref} />;
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