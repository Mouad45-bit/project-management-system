// src/components/projects/ProjectModuleNavigation.tsx

import {
    BarChart3,
    CalendarClock,
    CheckSquare,
    MessageSquare,
    Network,
    Users,
} from "lucide-react";

const modules = [
    {
        title: "Tâches",
        description: "Suivre les tâches et leur workflow.",
        icon: CheckSquare,
    },
    {
        title: "Visualisation",
        description: "Préparer les vues Kanban et Gantt.",
        icon: Network,
    },
    {
        title: "Échéances & Retards",
        description: "Surveiller les dates critiques.",
        icon: CalendarClock,
    },
    {
        title: "Ressources humaines",
        description: "Analyser les affectations et la charge.",
        icon: Users,
    },
    {
        title: "Reporting",
        description: "Produire les indicateurs de pilotage.",
        icon: BarChart3,
    },
    {
        title: "Collaboration",
        description: "Commentaires, documents et échanges.",
        icon: MessageSquare,
    },
];

export function ProjectModuleNavigation() {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-950">
                    Modules associés
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Préparation des accès vers les futurs modules du système.
                </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
                {modules.map((module) => {
                    const Icon = module.icon;

                    return (
                        <article
                            key={module.title}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white"
                        >
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700">
                                <Icon size={19} />
                            </div>

                            <h3 className="font-semibold text-slate-950">
                                {module.title}
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                {module.description}
                            </p>

                            <span className="mt-3 inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">
                                Bientôt
                            </span>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}