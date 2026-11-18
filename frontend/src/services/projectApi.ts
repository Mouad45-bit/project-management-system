// src/services/projectApi.ts

import type { PageResponse, ApiErrorResponse } from "@/types/api";
import type {
    ProjectCreateRequest,
    ProjectDetailResponse,
    ProjectListItemResponse,
    ProjectStatus,
    ProjectSummaryResponse,
    ProjectUpdateRequest,
    ProjectMemberResponse,
} from "@/types/project";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

type GetProjectsParams = {
    search?: string;
    status?: ProjectStatus | "ALL";
    archived?: boolean;
    page?: number;
    size?: number;
    sort?: string;
};

async function parseApiError(response: Response): Promise<string> {
    try {
        const errorBody = (await response.json()) as ApiErrorResponse;
        return errorBody.message || "Une erreur API est survenue.";
    } catch {
        return "Une erreur API est survenue.";
    }
}

async function requestJson<T>(
    path: string,
    options?: RequestInit,
): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!response.ok) {
        throw new Error(await parseApiError(response));
    }

    return response.json() as Promise<T>;
}

async function requestVoid(
    path: string,
    options?: RequestInit,
): Promise<void> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!response.ok) {
        throw new Error(await parseApiError(response));
    }
}

function buildQueryString(
    params: Record<string, string | number | boolean | undefined>,
) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === "") {
            return;
        }

        searchParams.set(key, String(value));
    });

    return searchParams.toString();
}

export async function getProjects({
                                      search = "",
                                      status = "ALL",
                                      archived = false,
                                      page = 0,
                                      size = 10,
                                      sort = "createdAt,desc",
                                  }: GetProjectsParams = {}): Promise<PageResponse<ProjectListItemResponse>> {
    const query = buildQueryString({
        search,
        status: status === "ALL" ? undefined : status,
        archived,
        page,
        size,
        sort,
    });

    return requestJson<PageResponse<ProjectListItemResponse>>(
        `/api/projects?${query}`,
    );
}

export async function getProjectById(
    id: number,
): Promise<ProjectDetailResponse | null> {
    try {
        return await requestJson<ProjectDetailResponse>(`/api/projects/${id}`);
    } catch {
        return null;
    }
}

export async function getProjectSummary(
    id: number,
): Promise<ProjectSummaryResponse | null> {
    try {
        return await requestJson<ProjectSummaryResponse>(
            `/api/projects/${id}/summary`,
        );
    } catch {
        return null;
    }
}

export async function createProject(
    payload: ProjectCreateRequest,
): Promise<ProjectDetailResponse> {
    return requestJson<ProjectDetailResponse>("/api/projects", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function updateProject(
    id: number,
    payload: ProjectUpdateRequest,
): Promise<ProjectDetailResponse | null> {
    try {
        return await requestJson<ProjectDetailResponse>(`/api/projects/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
        });
    } catch {
        return null;
    }
}

export async function archiveProject(id: number): Promise<boolean> {
    await requestVoid(`/api/projects/${id}/archive`, {
        method: "PATCH",
    });

    return true;
}

export async function restoreProject(id: number): Promise<boolean> {
    await requestVoid(`/api/projects/${id}/restore`, {
        method: "PATCH",
    });

    return true;
}

export async function updateProjectMembers(
    id: number,
    memberIds: number[],
): Promise<ProjectMemberResponse[]> {
    return requestJson<ProjectMemberResponse[]>(`/api/projects/${id}/members`, {
        method: "PUT",
        body: JSON.stringify({ memberIds }),
    });
}