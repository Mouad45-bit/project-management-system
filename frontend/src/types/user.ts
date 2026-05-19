// src/types/user.ts

export interface AvailableUserResponse {
    id: number;
    fullName: string;
    roleLabel: string;
    workloadCurrent: number;
    workloadCapacity: number;
    workloadPercent: number;
    overloaded: boolean;
}