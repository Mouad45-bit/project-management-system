package com.projectmanagement.backend.dto.response;

import com.projectmanagement.backend.enums.ProjectTaskStatus;

import java.time.LocalDate;

public record ProjectTaskOverviewItemResponse(
        Long id,
        String title,
        ProjectTaskStatus status,
        String assigneeName,
        LocalDate dueDate,
        boolean late
) {
}