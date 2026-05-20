package com.projectmanagement.backend.dto.response;

public record ProjectSummaryResponse(
        int progressPercent,
        int todoCount,
        int inProgressCount,
        int toValidateCount,
        int completedCount,
        int blockedCount,
        int lateCount
) {
}