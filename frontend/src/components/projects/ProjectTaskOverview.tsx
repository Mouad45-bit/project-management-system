// src/components/projects/ProjectTaskOverview.tsx

import {
    AlertTriangle,
    CheckCircle2,
    CircleDashed,
    Clock3,
    PauseCircle,
} from "lucide-react";
import { DateRange } from "@/components/ui/DateRange";
import { cn } from "@/lib/classNames";
import type {
    ProjectTaskOverviewItem,
    ProjectTaskStatus,
} from "@/types/project";

type ProjectTaskOverviewProps = {
    tasks: ProjectTaskOverviewItem[];
    className?: string;
};

const taskStatusLabels: Record<ProjectTaskStatus, string> = {
    TODO: "À faire",
    IN_PROGRESS: "En cours",
    TO_VALIDATE: "À valider",
    COMPLETED: "Terminée",
    BLOCKED: "Bloquée",
};

const taskStatusClasses: Record<ProjectTaskStatus, string> = {
    TODO: "border-slate-200 bg-slate-100 text-slate-700",
    IN_PROGRESS: "border-blue-200 bg-blue-50 text-blue-700",
    TO_VALIDATE: "border-purple-200 bg-purple-50 text-purple-700",
    COMPLETED: "border-emerald-200 bg-emerald-50 text-emerald-700",
    BLOCKED: "border-red-200 bg-red-50 text-red-700",
};

const taskStatusIcons: Record<ProjectTaskStatus, typeof CircleDashed> = {
    TODO: CircleDashed,
    IN_PROGRESS: Clock3,
    TO_VALIDATE: AlertTriangle,
    COMPLETED: CheckCircle2,
    BLOCKED: PauseCircle,
};

export function ProjectTaskOverview
({
     tasks,
     className,
}: ProjectTaskOverviewProps) {
    return (
        <section
            className={cn(
                "flex min-h-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
                className,
            )}
        >
            <div className="mb-5 flex shrink-0 items-start justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-slate-950">
                        Aperçu des tâches
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Vue simplifiée des tâches rattachées au projet.
                    </p>
                </div>

                <span className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600">
                    {tasks.length} tâche{tasks.length > 1 ? "s" : ""}
                </span>
            </div>

            {tasks.length === 0 ? (
                <div className="flex min-h-0 flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <p className="text-sm font-medium text-slate-500">
                        Aucune tâche n’est encore rattachée à ce projet.
                    </p>
                </div>
            ) : (
                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
                    {tasks.map((task) => {
                        const Icon = taskStatusIcons[task.status];

                        return (
                            <article
                                key={task.id}
                                className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:bg-slate-50"
                            >
                                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                                    <div className="min-w-0">
                                        <div className="mb-2 flex flex-wrap items-center gap-2">
                                            <span
                                                className={cn(
                                                    "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold",
                                                    taskStatusClasses[task.status],
                                                )}
                                            >
                                                <Icon size={13} />
                                                {taskStatusLabels[task.status]}
                                            </span>

                                            {task.late ? (
                                                <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                                                    <AlertTriangle size={13} />
                                                    En retard
                                                </span>
                                            ) : null}
                                        </div>

                                        <h3 className="font-semibold text-slate-950">
                                            {task.title}
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Assignée à :{" "}
                                            {task.assigneeName ?? "Non affectée"}
                                        </p>
                                    </div>

                                    <div className="shrink-0 text-sm text-slate-600">
                                        {task.dueDate ? (
                                            <DateRange
                                                startDate={task.dueDate}
                                                endDate={task.dueDate}
                                            />
                                        ) : (
                                            <span>Échéance non définie</span>
                                        )}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}