// src/types/project.ts

export type ProjectStatus = "WAITING" | "IN_PROGRESS" | "COMPLETED";

export type ProjectTaskStatus =
    | "TODO"
    | "IN_PROGRESS"
    | "TO_VALIDATE"
    | "COMPLETED"
    | "BLOCKED";

export interface ProjectCreateRequest {
    name: string;
    description?: string;
    startDate: string;
    plannedEndDate?: string;
    status: ProjectStatus;
    memberIds?: number[];
}

export interface ProjectUpdateRequest {
    name: string;
    description?: string;
    startDate: string;
    plannedEndDate?: string;
    status: ProjectStatus;
    memberIds?: number[];
}

export interface ProjectListItemResponse {
    id: number;
    code: string;
    name: string;
    shortDescription?: string;
    startDate: string;
    plannedEndDate?: string;
    status: ProjectStatus;
    archived: boolean;
    progressPercent: number;
    tasksTotal: number;
    tasksDone: number;
    tasksLate: number;
}

export interface ProjectSummaryResponse {
    progressPercent: number;
    todoCount: number;
    inProgressCount: number;
    toValidateCount: number;
    completedCount: number;
    blockedCount: number;
    lateCount: number;
}

export interface ProjectMemberResponse {
    id: number;
    fullName: string;
    roleLabel: string;
    workloadCurrent: number;
    workloadCapacity: number;
    workloadPercent: number;
    overloaded: boolean;
}

export interface ProjectTaskOverviewItem {
    id: number;
    title: string;
    status: ProjectTaskStatus;
    assigneeName?: string;
    dueDate?: string;
    late: boolean;
}

export interface ProjectDetailResponse {
    id: number;
    code: string;
    name: string;
    description?: string;
    startDate: string;
    plannedEndDate?: string;
    status: ProjectStatus;
    archived: boolean;
    progressPercent: number;
    membersCount: number;
    summary: ProjectSummaryResponse;
    members: ProjectMemberResponse[];
    taskOverview: ProjectTaskOverviewItem[];
}