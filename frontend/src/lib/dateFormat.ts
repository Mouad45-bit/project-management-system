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

export function formatDateRange(startDate?: string, plannedEndDate?: string): string {
    const start = formatDate(startDate);
    const end = plannedEndDate ? formatDate(plannedEndDate) : "Non définie";
    //
    return `${start} → ${end}`;
}

export function toInputDate(value?: string): string {
    if (!value) {
        return "";
    }

    return value.slice(0, 10);
}