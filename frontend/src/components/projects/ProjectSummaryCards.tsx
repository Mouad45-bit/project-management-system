// src/components/projects/ProjectSummaryCards.tsx

import {
    AlertTriangle,
    CheckCircle2,
    CircleDashed,
    Clock3,
    Gauge,
    PauseCircle,
} from "lucide-react";
import { ProjectProgressBar } from "@/components/projects/ProjectProgressBar";
import type { ProjectSummaryResponse } from "@/types/project";

type ProjectSummaryCardsProps = {
    summary: ProjectSummaryResponse;
};

export function ProjectSummaryCards({ summary }: ProjectSummaryCardsProps) {
    const cards = [
        {
            label: "À faire",
            value: summary.todoCount,
            icon: CircleDashed,
            description: "Tâches non démarrées",
        },
        {
            label: "En cours",
            value: summary.inProgressCount,
            icon: Clock3,
            description: "Tâches en traitement",
        },
        {
            label: "Terminées",
            value: summary.completedCount,
            icon: CheckCircle2,
            description: "Tâches finalisées",
        },
        {
            label: "En retard",
            value: summary.lateCount,
            icon: AlertTriangle,
            description: "Échéances dépassées",
        },
        {
            label: "Bloquées",
            value: summary.blockedCount,
            icon: PauseCircle,
            description: "Tâches à débloquer",
        },
    ];

    return (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2 xl:col-span-2">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                        <Gauge size={20} />
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-slate-500">
                            Avancement global
                        </p>
                        <p className="text-2xl font-bold text-slate-950">
                            {summary.progressPercent}%
                        </p>
                    </div>
                </div>

                <ProjectProgressBar value={summary.progressPercent} showLabel={false} />

                <p className="mt-3 text-sm text-slate-500">
                    Progression calculée à partir des tâches du projet.
                </p>
            </article>

            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <article
                        key={card.label}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                            <Icon size={20} />
                        </div>

                        <p className="text-2xl font-bold text-slate-950">
                            {card.value}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-700">
                            {card.label}
                        </p>
                        <p className="mt-2 text-xs leading-5 text-slate-500">
                            {card.description}
                        </p>
                    </article>
                );
            })}
        </section>
    );
}