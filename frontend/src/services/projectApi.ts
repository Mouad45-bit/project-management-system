// src/services/projectApi.ts

import {
    mockProjectDetails,
    mockProjectListItems,
} from "@/mocks/projectMocks";
import type { PageResponse } from "@/types/api";
import type {
    ProjectCreateRequest,
    ProjectDetailResponse,
    ProjectListItemResponse,
    ProjectStatus,
    ProjectSummaryResponse,
    ProjectUpdateRequest,
} from "@/types/project";
import { mockAvailableUsers } from "@/mocks/userMocks";

type GetProjectsParams = {
    search?: string;
    status?: ProjectStatus | "ALL";
    archived?: boolean;
    page?: number;
    size?: number;
};

let projects = [...mockProjectDetails];

function clone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
}

function toListItem(project: ProjectDetailResponse): ProjectListItemResponse {
    return {
        id: project.id,
        code: project.code,
        name: project.name,
        shortDescription: project.description,
        startDate: project.startDate,
        plannedEndDate: project.plannedEndDate,
        status: project.status,
        archived: project.archived,
        progressPercent: project.progressPercent,
        tasksTotal:
            project.summary.todoCount +
            project.summary.inProgressCount +
            project.summary.toValidateCount +
            project.summary.completedCount +
            project.summary.blockedCount,
        tasksDone: project.summary.completedCount,
        tasksLate: project.summary.lateCount,
    };
}

export async function getProjects
({
     search = "",
     status = "ALL",
     archived = false,
     page = 0,
     size = 10,
}: GetProjectsParams = {}): Promise<PageResponse<ProjectListItemResponse>> {
    const normalizedSearch = search.trim().toLowerCase();

    const filteredProjects = projects
        .map(toListItem)
        .filter((project) => project.archived === archived)
        .filter((project) => {
            if (!normalizedSearch) {
                return true;
            }

            return (
                project.name.toLowerCase().includes(normalizedSearch) ||
                project.code.toLowerCase().includes(normalizedSearch)
            );
        })
        .filter((project) => {
            if (status === "ALL") {
                return true;
            }

            return project.status === status;
        });

    const start = page * size;
    const end = start + size;
    const content = filteredProjects.slice(start, end);

    return {
        content: clone(content),
        page,
        size,
        totalElements: filteredProjects.length,
        totalPages: Math.max(1, Math.ceil(filteredProjects.length / size)),
        first: page === 0,
        last: end >= filteredProjects.length,
    };
}

export async function getProjectById(
    id: number,
): Promise<ProjectDetailResponse | null> {
    const project = projects.find((item) => item.id === id);

    return project ? clone(project) : null;
}

export async function getProjectSummary(
    id: number,
): Promise<ProjectSummaryResponse | null> {
    const project = projects.find((item) => item.id === id);

    return project ? clone(project.summary) : null;
}

export async function createProject(
    payload: ProjectCreateRequest,
): Promise<ProjectDetailResponse> {
    const nextId = Math.max(...projects.map((project) => project.id)) + 1;
    const nextCode = `PRJ-${String(nextId).padStart(3, "0")}`;

    const selectedMembers = mockAvailableUsers.filter((user) =>
        payload.memberIds?.includes(user.id),
    );

    const createdProject: ProjectDetailResponse = {
        id: nextId,
        code: nextCode,
        name: payload.name,
        description: payload.description,
        startDate: payload.startDate,
        plannedEndDate: payload.plannedEndDate,
        status: payload.status,
        archived: false,
        progressPercent: 0,
        membersCount: payload.memberIds?.length ?? 0,
        summary: {
            progressPercent: 0,
            todoCount: 0,
            inProgressCount: 0,
            toValidateCount: 0,
            completedCount: 0,
            blockedCount: 0,
            lateCount: 0,
        },
        members: selectedMembers,
        taskOverview: [],
    };

    projects = [createdProject, ...projects];

    return clone(createdProject);
}

export async function updateProject(
    id: number,
    payload: ProjectUpdateRequest,
): Promise<ProjectDetailResponse | null> {
    const projectIndex = projects.findIndex((project) => project.id === id);

    if (projectIndex === -1) {
        return null;
    }

    const selectedMembers = mockAvailableUsers.filter((user) =>
        payload.memberIds?.includes(user.id),
    );

    projects[projectIndex] = {
        ...projects[projectIndex],
        name: payload.name,
        description: payload.description ?? projects[projectIndex].description,
        startDate: payload.startDate,
        plannedEndDate: payload.plannedEndDate ?? projects[projectIndex].plannedEndDate,
        status: payload.status,
        members: selectedMembers,
        membersCount: payload.memberIds?.length ?? projects[projectIndex].membersCount,
    };

    return clone(projects[projectIndex]);
}

export async function archiveProject(id: number): Promise<boolean> {
    const project = projects.find((item) => item.id === id);

    if (!project) {
        return false;
    }

    project.archived = true;
    return true;
}

export async function restoreProject(id: number): Promise<boolean> {
    const project = projects.find((item) => item.id === id);

    if (!project) {
        return false;
    }

    project.archived = false;
    return true;
}

export const initialMockProjects = mockProjectListItems;