// src/components/projects/ProjectActionButtons.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { Archive, Eye, Pencil } from "lucide-react";
import { ConfirmActionModal } from "@/components/ui/ConfirmActionModal";

type ProjectActionButtonsProps = {
    projectId: number;
    onArchive: (projectId: number) => void;
};

export function ProjectActionButtons
({
     projectId,
     onArchive,
 }: ProjectActionButtonsProps) {
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

    function handleConfirmArchive() {
        onArchive(projectId);
        setIsArchiveModalOpen(false);
    }

    return (
        <>
            <div className="flex items-center justify-end gap-2">
                <Link
                    href={`/projects/${projectId}?returnTo=${encodeURIComponent("/projects")}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
                    title="Voir le détail"
                >
                    <Eye size={16} />
                </Link>

                <Link
                    href={`/projects/${projectId}/update?returnTo=${encodeURIComponent("/projects")}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
                    title="Modifier"
                >
                    <Pencil size={16} />
                </Link>

                <button
                    type="button"
                    onClick={() => setIsArchiveModalOpen(true)}
                    className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                    title="Archiver"
                >
                    <Archive size={16} />
                </button>
            </div>

            <ConfirmActionModal
                open={isArchiveModalOpen}
                title="Archiver ce projet ?"
                message="Ce projet sera retiré de la liste des projets actifs. Vous pourrez le retrouver et le restaurer depuis la page des projets archivés."
                confirmLabel="Archiver"
                icon={Archive}
                tone="warning"
                onConfirm={handleConfirmArchive}
                onClose={() => setIsArchiveModalOpen(false)}
            />
        </>
    );
}