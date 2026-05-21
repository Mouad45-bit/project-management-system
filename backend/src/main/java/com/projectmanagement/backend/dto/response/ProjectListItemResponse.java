package com.projectmanagement.backend.dto.response;

import com.projectmanagement.backend.enums.ProjectStatus;

import java.time.LocalDate;

public record ProjectListItemResponse(
        Long id,
        String code,
        String name,
        String shortDescription,
        LocalDate startDate,
        LocalDate plannedEndDate,
        ProjectStatus status,
        boolean archived,
        int progressPercent,
        int tasksTotal,
        int tasksDone,
        int tasksLate
) {
}