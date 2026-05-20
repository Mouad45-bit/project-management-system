// src/components/projects/ProjectForm.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import {
    AlertCircle,
    CalendarDays,
    ClipboardList,
    FileText,
    Save,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { ProjectMemberSelector } from "@/components/projects/ProjectMemberSelector";
import { PROJECT_STATUS_OPTIONS } from "@/lib/statusFormat";
import {
    hasValidationErrors,
    validateProjectPayload,
    type ProjectValidationErrors,
} from "@/lib/validators";
import type { ProjectCreateRequest, ProjectStatus } from "@/types/project";

type ProjectFormMode = "create" | "edit";

type ProjectFormProps = {
    mode: ProjectFormMode;
    initialValues?: Partial<ProjectCreateRequest> & {
        code?: string;
    };
    cancelHref: string;
    onSubmit: (payload: ProjectCreateRequest) => Promise<void> | void;
};

export function ProjectForm
({
     mode,
     initialValues,
     cancelHref,
     onSubmit,
}: ProjectFormProps) {
    const [name, setName] = useState(initialValues?.name ?? "");
    const [description, setDescription] = useState(
        initialValues?.description ?? "",
    );
    const [startDate, setStartDate] = useState(initialValues?.startDate ?? "");
    const [plannedEndDate, setPlannedEndDate] = useState(
        initialValues?.plannedEndDate ?? "",
    );
    const [status, setStatus] = useState<ProjectStatus>(
        initialValues?.status ?? "WAITING",
    );
    const [memberIds, setMemberIds] = useState<number[]>(
        initialValues?.memberIds ?? [],
    );
    const [errors, setErrors] = useState<ProjectValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isEditMode = mode === "edit";

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const payload: ProjectCreateRequest = {
            name,
            description,
            startDate,
            plannedEndDate: plannedEndDate || undefined,
            status,
            memberIds,
        };

        const validationErrors = validateProjectPayload(payload);
        setErrors(validationErrors);

        if (hasValidationErrors(validationErrors)) {
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit(payload);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[1fr_420px]">
            <div className="space-y-6">
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                            <ClipboardList size={20} />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-slate-950">
                                Informations générales
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                Renseignez les informations principales du projet.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5">
                        {isEditMode && initialValues?.code ? (
                            <div>
                                <Label>Code projet</Label>
                                <Input value={initialValues.code} disabled />
                                <p className="mt-2 text-xs text-slate-500">
                                    Le code projet est généré automatiquement et ne peut pas être
                                    modifié.
                                </p>
                            </div>
                        ) : null}

                        <div>
                            <Label required>Nom du projet</Label>
                            <Input
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Exemple : Plateforme de gestion des projets"
                            />
                            <FieldError message={errors.name} />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <div className="relative">
                                <FileText
                                    size={18}
                                    className="pointer-events-none absolute left-3 top-3 text-slate-400"
                                />
                                <textarea
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    placeholder="Décrivez brièvement le contexte, les objectifs et le périmètre du projet..."
                                    rows={5}
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 pl-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                                />
                            </div>
                            <FieldError message={errors.description} />
                        </div>
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                            <CalendarDays size={20} />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-slate-950">
                                Planification
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                La date de début est obligatoire. La date de fin prévue reste
                                optionnelle, mais elle doit être cohérente avec la date de début.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <Label required>Date de début</Label>
                            <Input
                                type="date"
                                value={startDate}
                                onChange={(event) => setStartDate(event.target.value)}
                            />
                            <FieldError message={errors.startDate} />
                        </div>

                        <div>
                            <Label>Date de fin prévue</Label>
                            <Input
                                type="date"
                                value={plannedEndDate}
                                onChange={(event) => setPlannedEndDate(event.target.value)}
                            />
                            <FieldError message={errors.plannedEndDate} />
                        </div>

                        <div className="md:col-span-2">
                            <Label required>Statut initial</Label>
                            <select
                                value={status}
                                onChange={(event) =>
                                    setStatus(event.target.value as ProjectStatus)
                                }
                                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                            >
                                {PROJECT_STATUS_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <FieldError message={errors.status} />
                        </div>
                    </div>
                </section>
            </div>

            <aside className="space-y-6">
                <ProjectMemberSelector selectedIds={memberIds} onChange={setMemberIds} />

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:sticky xl:top-24">
                    <h2 className="mb-2 text-base font-bold text-slate-950">
                        Résumé de création
                    </h2>

                    <p className="mb-5 text-sm leading-6 text-slate-500">
                        Vérifiez les informations avant d’enregistrer le projet.
                    </p>

                    <div className="space-y-3 rounded-2xl bg-slate-50 p-4">
                        <SummaryRow label="Nom" value={name || "Non renseigné"} />
                        <SummaryRow label="Date début" value={startDate || "Non définie"} />
                        <SummaryRow
                            label="Date fin"
                            value={plannedEndDate || "Non définie"}
                        />
                        <SummaryRow label="Membres" value={String(memberIds.length)} />
                    </div>

                    {hasValidationErrors(errors) ? (
                        <div className="mt-4 flex gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                            <AlertCircle size={18} className="mt-0.5 shrink-0" />
                            <p>
                                Certains champs sont invalides. Corrigez les erreurs avant de
                                continuer.
                            </p>
                        </div>
                    ) : null}

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row xl:flex-col">
                        <Link
                            href={cancelHref}
                            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Annuler
                        </Link>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Save size={17} />
                            {isSubmitting
                                ? "Enregistrement..."
                                : isEditMode
                                    ? "Sauvegarder"
                                    : "Créer le projet"
                            }
                        </button>
                    </div>
                </section>
            </aside>
        </form>
    );
}

function Label
({
     children,
     required = false,
}: {
    children: React.ReactNode;
    required?: boolean;
}) {
    return (
        <label className="mb-2 block text-sm font-semibold text-slate-700">
            {children}
            {required ? <span className="ml-1 text-red-500">*</span> : null}
        </label>
    );
}

function FieldError({ message }: { message?: string }) {
    if (!message) {
        return null;
    }

    return <p className="mt-2 text-sm font-medium text-red-600">{message}</p>;
}

function SummaryRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-500">{label}</span>
            <span className="max-w-[220px] truncate font-semibold text-slate-950">
        {value}
      </span>
        </div>
    );
}