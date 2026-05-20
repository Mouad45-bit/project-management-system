package com.projectmanagement.backend.dto.response;

import com.projectmanagement.backend.enums.ProjectStatus;

import java.time.LocalDate;
import java.util.List;

public record ProjectDetailResponse(
        Long id,
        String code,
        String name,
        String description,
        LocalDate startDate,
        LocalDate plannedEndDate,
        ProjectStatus status,
        boolean archived,
        int progressPercent,
        int membersCount,
        ProjectSummaryResponse summary,
        List<ProjectMemberResponse> members,
        List<ProjectTaskOverviewItemResponse> taskOverview
) {

    public ProjectDetailResponse {
        members = members == null ? List.of() : List.copyOf(members);
        taskOverview = taskOverview == null ? List.of() : List.copyOf(taskOverview);
    }
}