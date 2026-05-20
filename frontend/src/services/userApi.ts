// src/services/userApi.ts

import type { ApiErrorResponse } from "@/types/api";
import type { AvailableUserResponse } from "@/types/user";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

async function parseApiError(response: Response): Promise<string> {
    try {
        const errorBody = (await response.json()) as ApiErrorResponse;
        return errorBody.message || "Une erreur API est survenue.";
    } catch {
        return "Une erreur API est survenue.";
    }
}

export async function getAvailableUsers(
    search = "",
): Promise<AvailableUserResponse[]> {
    const searchParams = new URLSearchParams();

    if (search.trim()) {
        searchParams.set("search", search.trim());
    }

    const query = searchParams.toString();
    const path = query
        ? `/api/users/available?${query}`
        : "/api/users/available";

    const response = await fetch(`${API_BASE_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(await parseApiError(response));
    }

    return response.json() as Promise<AvailableUserResponse[]>;
}