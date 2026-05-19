// src/app/projects/create/page.tsx

import { PageHeader } from "@/components/ui/PageHeader";

export default function CreateProjectPage() {
    return (
        <>
            <PageHeader
                eyebrow="Création"
                title="Nouveau projet"
                description="Cette page contiendra le formulaire de création d’un projet avec sélection des membres et validation des dates."
            />

            <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <h2 className="text-lg font-semibold text-slate-950">
                    Formulaire de création
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                    Le formulaire sera développé dans la phase dédiée à la création de
                    projet.
                </p>
            </section>
        </>
    );
}