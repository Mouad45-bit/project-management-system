// src/services/userApi.ts

import { mockAvailableUsers } from "@/mocks/userMocks";
import type { AvailableUserResponse } from "@/types/user";

export async function getAvailableUsers(
    search = "",
): Promise<AvailableUserResponse[]> {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
        return mockAvailableUsers;
    }

    return mockAvailableUsers.filter((user) => {
        return (
            user.fullName.toLowerCase().includes(normalizedSearch) ||
            user.roleLabel.toLowerCase().includes(normalizedSearch)
        );
    });
}