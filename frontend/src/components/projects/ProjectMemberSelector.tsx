// src/components/projects/ProjectMemberSelector.tsx

"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Check, Search, UsersRound } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { getAvailableUsers } from "@/services/userApi";
import type { AvailableUserResponse } from "@/types/user";
import { cn } from "@/lib/classNames";

type ProjectMemberSelectorProps = {
    selectedIds: number[];
    onChange: (selectedIds: number[]) => void;
};

export function ProjectMemberSelector
({
     selectedIds,
     onChange,
}: ProjectMemberSelectorProps) {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<AvailableUserResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        async function loadUsers() {
            setIsLoading(true);
            const response = await getAvailableUsers(search);

            if (isActive) {
                setUsers(response);
                setIsLoading(false);
            }
        }

        void loadUsers();

        return () => {
            isActive = false;
        };
    }, [search]);

    const selectedUsers = useMemo(() => {
        return users.filter((user) => selectedIds.includes(user.id));
    }, [users, selectedIds]);

    function toggleUser(userId: number) {
        if (selectedIds.includes(userId)) {
            onChange(selectedIds.filter((id) => id !== userId));
            return;
        }

        onChange([...selectedIds, userId]);
    }

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                            <UsersRound size={18} />
                        </div>
                        <h2 className="text-base font-bold text-slate-950">
                            Membres du projet
                        </h2>
                    </div>

                    <p className="text-sm leading-6 text-slate-500">
                        Sélectionnez les utilisateurs à désigner dans ce projet.
                    </p>
                </div>

                <div className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600">
                    {selectedIds.length} sélectionné{selectedIds.length > 1 ? "s" : ""}
                </div>
            </div>

            <div className="relative mb-4">
                <Search
                    size={18}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Rechercher par nom ou rôle..."
                    className="pl-10"
                />
            </div>

            {isLoading ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                    <p className="text-sm font-medium text-slate-500">
                        Chargement des membres disponibles...
                    </p>
                </div>
            ) : users.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                    <p className="text-sm font-medium text-slate-500">
                        Aucun utilisateur ne correspond à la recherche.
                    </p>
                </div>
            ) : (
                <div className="grid gap-3">
                    {users.map((user) => {
                        const isSelected = selectedIds.includes(user.id);

                        return (
                            <button
                                key={user.id}
                                type="button"
                                onClick={() => toggleUser(user.id)}
                                className={cn(
                                    "flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition",
                                    isSelected
                                        ? "border-slate-900 bg-slate-50"
                                        : "border-slate-200 bg-white hover:bg-slate-50",
                                )}
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <div
                                        className={cn(
                                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
                                            isSelected
                                                ? "bg-slate-900 text-white"
                                                : "bg-slate-100 text-slate-600",
                                        )}
                                    >
                                        {isSelected ? <Check size={18} /> : user.fullName.charAt(0)}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate font-semibold text-slate-950">
                                            {user.fullName}
                                        </p>
                                        <p className="truncate text-sm text-slate-500">
                                            {user.roleLabel}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex shrink-0 flex-col items-end gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold text-slate-500">
                                            Charge
                                        </span>
                                        <span className="text-sm font-bold text-slate-950">
                                            {user.workloadPercent}%
                                        </span>
                                    </div>

                                    <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-100">
                                        <div
                                            className={cn(
                                                "h-full rounded-full",
                                                user.overloaded ? "bg-amber-500" : "bg-slate-900",
                                            )}
                                            style={{ width: `${Math.min(user.workloadPercent, 100)}%` }}
                                        />
                                    </div>

                                    {user.overloaded ? (
                                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                                            <AlertTriangle size={12} />
                                            Surchargé
                                        </span>
                                    ) : null}
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {selectedUsers.length > 0 ? (
                <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Membres sélectionnés
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {selectedUsers.map((user) => (
                            <span
                                key={user.id}
                                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                            >
                                {user.fullName}
                            </span>
                        ))}
                    </div>
                </div>
            ) : null}
        </section>
    );
}