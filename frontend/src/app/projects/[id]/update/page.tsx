// src/app/projects/[id]/update/page.tsx

import { ProjectEditView } from "@/components/projects/ProjectEditView";

type UpdateProjectPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function UpdateProjectPage
({
     params,
}: UpdateProjectPageProps) {
    const { id } = await params;

    return <ProjectEditView projectId={Number(id)} />;
}