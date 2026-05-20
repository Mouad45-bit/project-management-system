// src/mocks/projectMocks.ts

import type {
    ProjectDetailResponse,
    ProjectListItemResponse,
    ProjectMemberResponse,
    ProjectSummaryResponse,
    ProjectTaskOverviewItem,
} from "@/types/project";
import type { PageResponse } from "@/types/api";

export const mockProjectMembers: ProjectMemberResponse[] = [
    {
        id: 1,
        fullName: "Mouad Fekkak",
        roleLabel: "Chef de projet",
        workloadCurrent: 3,
        workloadCapacity: 6,
        workloadPercent: 50,
        overloaded: false,
    },
    {
        id: 2,
        fullName: "Marwane Drissi",
        roleLabel: "Développeur frontend",
        workloadCurrent: 5,
        workloadCapacity: 6,
        workloadPercent: 83,
        overloaded: false,
    },
    {
        id: 3,
        fullName: "Yassine Amrani",
        roleLabel: "Développeur backend",
        workloadCurrent: 6,
        workloadCapacity: 6,
        workloadPercent: 100,
        overloaded: true,
    },
];

export const mockProjectSummary: ProjectSummaryResponse = {
    progressPercent: 45,
    todoCount: 8,
    inProgressCount: 5,
    toValidateCount: 2,
    completedCount: 7,
    blockedCount: 1,
    lateCount: 3,
};

const projectOneTasks: ProjectTaskOverviewItem[] = [
    {
        id: 1,
        title: "Finaliser la structure du module projets",
        status: "COMPLETED",
        assigneeName: "Mouad Fekkak",
        dueDate: "2026-01-30",
        late: false,
    },
    {
        id: 2,
        title: "Créer l’interface de liste des projets",
        status: "COMPLETED",
        assigneeName: "Marwane Drissi",
        dueDate: "2026-02-10",
        late: false,
    },
    {
        id: 3,
        title: "Développer le formulaire de création",
        status: "IN_PROGRESS",
        assigneeName: "Marwane Drissi",
        dueDate: "2026-02-18",
        late: false,
    },
    {
        id: 4,
        title: "Préparer les endpoints REST du module",
        status: "TODO",
        assigneeName: "Yassine Amrani",
        dueDate: "2026-02-22",
        late: true,
    },
];

const projectTwoTasks: ProjectTaskOverviewItem[] = [
    {
        id: 5,
        title: "Analyser les besoins du tableau de bord",
        status: "IN_PROGRESS",
        assigneeName: "Mouad Fekkak",
        dueDate: "2026-02-15",
        late: false,
    },
    {
        id: 6,
        title: "Préparer les cartes d’indicateurs",
        status: "TODO",
        assigneeName: "Marwane Drissi",
        dueDate: "2026-02-25",
        late: false,
    },
];

const projectThreeTasks: ProjectTaskOverviewItem[] = [
    {
        id: 7,
        title: "Créer la maquette Kanban",
        status: "COMPLETED",
        assigneeName: "Marwane Drissi",
        dueDate: "2025-11-18",
        late: false,
    },
    {
        id: 8,
        title: "Valider le prototype",
        status: "COMPLETED",
        assigneeName: "Mouad Fekkak",
        dueDate: "2025-12-20",
        late: false,
    },
];

export const mockProjectDetails: ProjectDetailResponse[] = [
    {
        id: 1,
        code: "PRJ-001",
        name: "Plateforme de gestion des projets",
        description:
            "Conception et réalisation d'un système web de management des projets avec Spring Boot et Next.js.",
        startDate: "2026-01-15",
        plannedEndDate: "2026-04-30",
        status: "IN_PROGRESS",
        archived: false,
        progressPercent: 45,
        membersCount: 3,
        summary: mockProjectSummary,
        members: mockProjectMembers,
        taskOverview: projectOneTasks,
    },
    {
        id: 2,
        code: "PRJ-002",
        name: "Refonte du tableau de bord",
        description:
            "Amélioration de la visualisation des indicateurs de pilotage.",
        startDate: "2026-02-01",
        plannedEndDate: "2026-03-20",
        status: "WAITING",
        archived: false,
        progressPercent: 10,
        membersCount: 2,
        summary: {
            progressPercent: 10,
            todoCount: 12,
            inProgressCount: 1,
            toValidateCount: 0,
            completedCount: 1,
            blockedCount: 0,
            lateCount: 0,
        },
        members: mockProjectMembers.slice(0, 2),
        taskOverview: projectTwoTasks,
    },
    {
        id: 3,
        code: "PRJ-003",
        name: "Prototype Kanban",
        description:
            "Prototype de visualisation des tâches par colonnes Kanban.",
        startDate: "2025-11-05",
        plannedEndDate: "2025-12-28",
        status: "COMPLETED",
        archived: true,
        progressPercent: 100,
        membersCount: 2,
        summary: {
            progressPercent: 100,
            todoCount: 0,
            inProgressCount: 0,
            toValidateCount: 0,
            completedCount: 18,
            blockedCount: 0,
            lateCount: 0,
        },
        members: mockProjectMembers.slice(1, 3),
        taskOverview: projectThreeTasks,
    },
];

export const mockProjectListItems: ProjectListItemResponse[] =
    mockProjectDetails.map((project) => ({
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
    }));

export const mockProjectPage: PageResponse<ProjectListItemResponse> = {
    content: mockProjectListItems.filter((project) => !project.archived),
    page: 0,
    size: 10,
    totalElements: mockProjectListItems.filter((project) => !project.archived)
        .length,
    totalPages: 1,
    first: true,
    last: true,
};