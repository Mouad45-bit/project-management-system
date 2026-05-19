// src/app/projects/[id]/update/page.tsx

import { PageHeader } from "@/components/ui/PageHeader";

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

    return (
        <>
            <PageHeader
                eyebrow={`Projet #${id}`}
                title="Modifier le projet"
                description="Cette page contiendra le formulaire de modification avec le code projet en lecture seule."
            />

            <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <h2 className="text-lg font-semibold text-slate-950">
                    Formulaire de modification
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                    Le formulaire prérempli sera développé dans la phase modification
                    projet.
                </p>
            </section>
        </>
    );
}