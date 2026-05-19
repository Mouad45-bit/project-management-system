// src/mocks/userMocks.ts

import type { AvailableUserResponse } from "@/types/user";

export const mockAvailableUsers: AvailableUserResponse[] = [
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
    {
        id: 4,
        fullName: "Sara El Mansouri",
        roleLabel: "Testeuse QA",
        workloadCurrent: 2,
        workloadCapacity: 5,
        workloadPercent: 40,
        overloaded: false,
    },
];