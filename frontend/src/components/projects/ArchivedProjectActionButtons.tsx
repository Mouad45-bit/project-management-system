// src/components/projects/ArchivedProjectActionButtons.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, RotateCcw } from "lucide-react";
import { ConfirmActionModal } from "@/components/ui/ConfirmActionModal";

type ArchivedProjectActionButtonsProps = {
    projectId: number;
    onRestore: (projectId: number) => void;
};

export function ArchivedProjectActionButtons
({
     projectId,
     onRestore,
 }: ArchivedProjectActionButtonsProps) {
    const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);

    function handleConfirmRestore() {
        onRestore(projectId);
        setIsRestoreModalOpen(false);
    }

    return (
        <>
            <div className="flex items-center justify-end gap-2">
                <Link
                    href={`/projects/${projectId}?returnTo=${encodeURIComponent(
                        "/projects/archives",
                    )}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
                    title="Voir le détail"
                >
                    <Eye size={16} />
                </Link>

                <button
                    type="button"
                    onClick={() => setIsRestoreModalOpen(true)}
                    className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                    title="Restaurer"
                >
                    <RotateCcw size={16} />
                </button>
            </div>

            <ConfirmActionModal
                open={isRestoreModalOpen}
                title="Restaurer ce projet ?"
                message="Ce projet sera replacé dans la liste des projets actifs. Son statut métier sera conservé."
                confirmLabel="Restaurer"
                icon={RotateCcw}
                tone="success"
                onConfirm={handleConfirmRestore}
                onClose={() => setIsRestoreModalOpen(false)}
            />
        </>
    );
}