// src/lib/statusFormat.ts

import type { ProjectStatus } from "@/types/project";

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
    WAITING: "En attente",
    IN_PROGRESS: "En cours",
    COMPLETED: "Terminé",
};

export const PROJECT_STATUS_OPTIONS: Array<{
    value: ProjectStatus;
    label: string;
}> = [
    { value: "WAITING", label: "En attente" },
    { value: "IN_PROGRESS", label: "En cours" },
    { value: "COMPLETED", label: "Terminé" },
];

export function getProjectStatusLabel(status: ProjectStatus): string {
    return PROJECT_STATUS_LABELS[status] ?? status;
}

export function getProjectStatusClassName(status: ProjectStatus): string {
    switch (status) {
        case "WAITING":
            return "bg-slate-100 text-slate-700 border-slate-200";
        case "IN_PROGRESS":
            return "bg-blue-50 text-blue-700 border-blue-200";
        case "COMPLETED":
            return "bg-emerald-50 text-emerald-700 border-emerald-200";
        default:
            return "bg-slate-100 text-slate-700 border-slate-200";
    }
}