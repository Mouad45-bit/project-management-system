// src/components/ui/ConfirmActionModal.tsx

"use client";

import type { LucideIcon } from "lucide-react";
import { X } from "lucide-react";
import { cn } from "@/lib/classNames";

type ConfirmActionTone = "warning" | "success";

type ConfirmActionModalProps = {
    open: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    cancelLabel?: string;
    icon: LucideIcon;
    tone: ConfirmActionTone;
    onConfirm: () => void;
    onClose: () => void;
};

const toneClasses: Record<
    ConfirmActionTone,
    {
        icon: string;
        confirmButton: string;
    }
    > = {
    warning: {
        icon: "border-amber-200 bg-amber-50 text-amber-700",
        confirmButton: "bg-amber-600 text-white hover:bg-amber-700",
    },
    success: {
        icon: "border-emerald-200 bg-emerald-50 text-emerald-700",
        confirmButton: "bg-emerald-600 text-white hover:bg-emerald-700",
    },
};

export function ConfirmActionModal
({
     open,
     title,
     message,
     confirmLabel,
     cancelLabel = "Annuler",
     icon: Icon,
     tone,
     onConfirm,
     onClose,
}: ConfirmActionModalProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div
                        className={cn(
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border",
                            toneClasses[tone].icon,
                        )}
                    >
                        <Icon size={22} />
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex cursor-pointer h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        aria-label="Fermer"
                    >
                        <X size={18} />
                    </button>
                </div>

                <h2 className="text-lg font-bold text-slate-950">
                    {title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                    {message}
                </p>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex cursor-pointer h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        {cancelLabel}
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className={cn(
                            "inline-flex cursor-pointer h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition",
                            toneClasses[tone].confirmButton,
                        )}
                    >
                        <Icon size={17} />
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}