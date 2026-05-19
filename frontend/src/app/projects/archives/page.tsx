// src/app/projects/archives/page.tsx

import { PageHeader } from "@/components/ui/PageHeader";

export default function ArchivedProjectsPage() {
    return (
        <>
            <PageHeader
                eyebrow="Archivage"
                title="Projets archivés"
                description="Consultez les projets archivés et restaurez-les si nécessaire."
            />

            <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <h2 className="text-lg font-semibold text-slate-950">
                    Liste des projets archivés
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                    Le tableau des projets archivés sera développé dans une phase dédiée.
                </p>
            </section>
        </>
    );
}