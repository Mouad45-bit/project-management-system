package com.projectmanagement.backend.service;

import com.projectmanagement.backend.dto.response.ProjectSummaryResponse;
import com.projectmanagement.backend.dto.response.ProjectTaskOverviewItemResponse;
import com.projectmanagement.backend.entity.ProjectMetrics;
import com.projectmanagement.backend.entity.ProjectTaskOverviewItem;
import com.projectmanagement.backend.mapper.ProjectMapper;
import com.projectmanagement.backend.repository.ProjectMetricsRepository;
import com.projectmanagement.backend.repository.ProjectTaskOverviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectMetricsService {

    private final ProjectMetricsRepository projectMetricsRepository;
    private final ProjectTaskOverviewRepository projectTaskOverviewRepository;
    private final ProjectMapper projectMapper;

    @Transactional(readOnly = true)
    public ProjectSummaryResponse getProjectSummary(Long projectId) {
        return projectMetricsRepository
                .findByProject_Id(projectId)
                .map(this::toSummaryResponse)
                .orElseGet(projectMapper::emptySummary);
    }

    @Transactional(readOnly = true)
    public List<ProjectTaskOverviewItemResponse> getTaskOverview(Long projectId) {
        return projectTaskOverviewRepository
                .findByProject_IdOrderByDisplayOrderAscIdAsc(projectId)
                .stream()
                .map(this::toTaskOverviewItemResponse)
                .toList();
    }

    private ProjectSummaryResponse toSummaryResponse(ProjectMetrics metrics) {
        return new ProjectSummaryResponse(
                metrics.getProgressPercent(),
                metrics.getTodoCount(),
                metrics.getInProgressCount(),
                metrics.getToValidateCount(),
                metrics.getCompletedCount(),
                metrics.getBlockedCount(),
                metrics.getLateCount()
        );
    }

    private ProjectTaskOverviewItemResponse toTaskOverviewItemResponse(
            ProjectTaskOverviewItem item
    ) {
        return new ProjectTaskOverviewItemResponse(
                item.getId(),
                item.getTitle(),
                item.getStatus(),
                item.getAssigneeName(),
                item.getDueDate(),
                item.isLate()
        );
    }
}