// src/lib/validators.ts

import type { ProjectCreateRequest, ProjectUpdateRequest } from "@/types/project";

export type ProjectValidationErrors = Partial<
    Record<keyof ProjectCreateRequest | keyof ProjectUpdateRequest, string>
>;

export function validateProjectPayload(
    payload: ProjectCreateRequest | ProjectUpdateRequest,
): ProjectValidationErrors {
    const errors: ProjectValidationErrors = {};

    if (!payload.name || payload.name.trim().length === 0) {
        errors.name = "Le nom du projet est obligatoire.";
    }

    if (!payload.startDate) {
        errors.startDate = "La date de début est obligatoire.";
    }

    if (!payload.status) {
        errors.status = "Le statut est obligatoire.";
    }

    if (
        payload.startDate &&
        payload.plannedEndDate &&
        payload.startDate >= payload.plannedEndDate
    ) {
        errors.plannedEndDate =
            "La date de fin prévue doit être supérieure à la date de début.";
    }

    return errors;
}

export function hasValidationErrors(errors: ProjectValidationErrors): boolean {
    return Object.keys(errors).length > 0;
}