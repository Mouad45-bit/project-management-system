// src/app/projects/[id]/page.tsx

import { PageHeader } from "@/components/ui/PageHeader";

type ProjectDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ProjectDetailPage
({
     params,
}: ProjectDetailPageProps) {
    const { id } = await params;

    return (
        <>
            <PageHeader
                eyebrow={`Projet #${id}`}
                title="Détail du projet"
                description="Cette page affichera les indicateurs de pilotage, l’équipe, les tâches et les liens vers les modules futurs."
            />

            <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <h2 className="text-lg font-semibold text-slate-950">
                    Tableau de bord projet
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                    Les cartes statistiques, la progression et les aperçus seront
                    développés dans la phase détail projet.
                </p>
            </section>
        </>
    );
}