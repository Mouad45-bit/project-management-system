package com.projectmanagement.backend.mapper;

import com.projectmanagement.backend.dto.request.ProjectCreateRequest;
import com.projectmanagement.backend.dto.request.ProjectUpdateRequest;
import com.projectmanagement.backend.dto.response.ProjectDetailResponse;
import com.projectmanagement.backend.dto.response.ProjectListItemResponse;
import com.projectmanagement.backend.dto.response.ProjectMemberResponse;
import com.projectmanagement.backend.dto.response.ProjectSummaryResponse;
import com.projectmanagement.backend.dto.response.ProjectTaskOverviewItemResponse;
import com.projectmanagement.backend.entity.Project;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProjectMapper {

    private static final int SHORT_DESCRIPTION_MAX_LENGTH = 180;

    public Project toEntity(ProjectCreateRequest request, String generatedCode) {
        Project project = new Project();

        project.setCode(generatedCode);
        project.setName(trimToNull(request.name()));
        project.setDescription(trimToNull(request.description()));
        project.setStartDate(request.startDate());
        project.setPlannedEndDate(request.plannedEndDate());
        project.setStatus(request.status());
        project.setArchived(false);

        return project;
    }

    public void updateEntity(Project project, ProjectUpdateRequest request) {
        project.setName(trimToNull(request.name()));
        project.setDescription(trimToNull(request.description()));
        project.setStartDate(request.startDate());
        project.setPlannedEndDate(request.plannedEndDate());
        project.setStatus(request.status());
    }

    public ProjectListItemResponse toListItemResponse(Project project) {
        return toListItemResponse(project, emptySummary());
    }

    public ProjectListItemResponse toListItemResponse(
            Project project,
            ProjectSummaryResponse summary
    ) {
        ProjectSummaryResponse safeSummary = summary == null
                ? emptySummary()
                : summary;

        return new ProjectListItemResponse(
                project.getId(),
                project.getCode(),
                project.getName(),
                toShortDescription(project.getDescription()),
                project.getStartDate(),
                project.getPlannedEndDate(),
                project.getStatus(),
                project.isArchived(),
                safeSummary.progressPercent(),
                totalTasks(safeSummary),
                safeSummary.completedCount(),
                safeSummary.lateCount()
        );
    }

    public ProjectDetailResponse toDetailResponse(
            Project project,
            ProjectSummaryResponse summary,
            List<ProjectMemberResponse> members,
            List<ProjectTaskOverviewItemResponse> taskOverview
    ) {
        ProjectSummaryResponse safeSummary = summary == null
                ? emptySummary()
                : summary;

        List<ProjectMemberResponse> safeMembers = members == null
                ? List.of()
                : List.copyOf(members);

        List<ProjectTaskOverviewItemResponse> safeTaskOverview = taskOverview == null
                ? List.of()
                : List.copyOf(taskOverview);

        return new ProjectDetailResponse(
                project.getId(),
                project.getCode(),
                project.getName(),
                project.getDescription(),
                project.getStartDate(),
                project.getPlannedEndDate(),
                project.getStatus(),
                project.isArchived(),
                safeSummary.progressPercent(),
                safeMembers.size(),
                safeSummary,
                safeMembers,
                safeTaskOverview
        );
    }

    public ProjectSummaryResponse emptySummary() {
        return new ProjectSummaryResponse(
                0,
                0,
                0,
                0,
                0,
                0,
                0
        );
    }

    private int totalTasks(ProjectSummaryResponse summary) {
        return summary.todoCount()
                + summary.inProgressCount()
                + summary.toValidateCount()
                + summary.completedCount()
                + summary.blockedCount();
    }

    private String toShortDescription(String description) {
        String normalizedDescription = trimToNull(description);

        if (normalizedDescription == null) {
            return null;
        }

        if (normalizedDescription.length() <= SHORT_DESCRIPTION_MAX_LENGTH) {
            return normalizedDescription;
        }

        return normalizedDescription.substring(0, SHORT_DESCRIPTION_MAX_LENGTH) + "...";
    }

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }

        String trimmedValue = value.trim();

        return trimmedValue.isEmpty() ? null : trimmedValue;
    }
}