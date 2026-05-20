// src/components/projects/ProjectTeamPanel.tsx

import { AlertTriangle, UsersRound } from "lucide-react";
import { cn } from "@/lib/classNames";
import type { ProjectMemberResponse } from "@/types/project";

type ProjectTeamPanelProps = {
    members: ProjectMemberResponse[];
};

export function ProjectTeamPanel({ members }: ProjectTeamPanelProps) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                            <UsersRound size={18} />
                        </div>

                        <h2 className="text-lg font-bold text-slate-950">
                            Équipe projet
                        </h2>
                    </div>

                    <p className="text-sm text-slate-500">
                        Membres désignés et charge actuelle.
                    </p>
                </div>

                <span className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600">
                    {members.length} membre{members.length > 1 ? "s" : ""}
                </span>
            </div>

            {members.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <p className="text-sm font-medium text-slate-500">
                        Aucun membre n’est encore désigné pour ce projet.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {members.map((member) => (
                        <article
                            key={member.id}
                            className={cn(
                                "rounded-2xl border p-4",
                                member.overloaded
                                    ? "border-amber-200 bg-amber-50"
                                    : "border-slate-200 bg-white",
                            )}
                        >
                            <div className="mb-3 flex items-start justify-between gap-3">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div
                                        className={cn(
                                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
                                            member.overloaded
                                                ? "bg-amber-100 text-amber-700"
                                                : "bg-slate-100 text-slate-700",
                                        )}
                                    >
                                        {member.fullName.charAt(0)}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate font-semibold text-slate-950">
                                            {member.fullName}
                                        </p>
                                        <p className="truncate text-sm text-slate-500">
                                            {member.roleLabel}
                                        </p>
                                    </div>
                                </div>

                                {member.overloaded ? (
                                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-200 bg-white px-2 py-1 text-xs font-semibold text-amber-700">
                                        <AlertTriangle size={13} />
                                        Surchargé
                                    </span>
                                ) : null}
                            </div>

                            <div className="mb-2 flex items-center justify-between text-xs">
                                <span className="font-medium text-slate-500">
                                    Charge actuelle
                                </span>
                                <span className="font-bold text-slate-950">
                                    {member.workloadCurrent}/{member.workloadCapacity} tâches
                                </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className={cn(
                                        "h-full rounded-full",
                                        member.overloaded ? "bg-amber-500" : "bg-slate-900",
                                    )}
                                    style={{
                                        width: `${Math.min(member.workloadPercent, 100)}%`,
                                    }}
                                />
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}