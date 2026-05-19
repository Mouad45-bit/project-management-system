// src/app/projects/page.tsx

import { PageHeader } from "@/components/ui/PageHeader";

export default function ProjectsPage() {
    return (
        <>
            <PageHeader
                eyebrow="Module Gestion des projets"
                title="Gestion des projets"
                description="Créez, suivez et pilotez vos projets. Cette interface sera complétée avec le tableau, les filtres et les actions dans la phase suivante."
            />

            <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <h2 className="text-lg font-semibold text-slate-950">
                    Liste des projets actifs
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                    Le tableau des projets, la recherche, le filtre par statut et les
                    actions seront développés dans la phase 3.
                </p>
            </section>
        </>
    );
}