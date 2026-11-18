package com.projectmanagement.backend.dto.response;

public record AvailableUserResponse(
        Long id,
        String fullName,
        String roleLabel,
        int workloadCurrent,
        int workloadCapacity,
        int workloadPercent,
        boolean overloaded
) {
}