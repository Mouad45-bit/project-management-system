// src/lib/dateFormat.ts

export function formatDate(value?: string): string {
    if (!value) {
        return "Non définie";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Date invalide";
    }

    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date);
}

export function toInputDate(value?: string): string {
    if (!value) {
        return "";
    }

    return value.slice(0, 10);
}

export function formatIsoDateToFrenchInput(value?: string): string {
    if (!value) {
        return "";
    }

    const [year, month, day] = value.split("-");

    if (!year || !month || !day) {
        return "";
    }

    return `${day}/${month}/${year}`;
}

export function normalizeFrenchDateInput(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 8);

    if (digits.length <= 2) {
        return digits;
    }

    if (digits.length <= 4) {
        return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }

    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function isValidFrenchDateInput(value: string): boolean {
    const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

    if (!match) {
        return false;
    }

    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);

    const date = new Date(year, month - 1, day);

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}

export function frenchDateInputToIso(value: string): string {
    if (!isValidFrenchDateInput(value)) {
        return "";
    }

    const [day, month, year] = value.split("/");

    return `${year}-${month}-${day}`;
}