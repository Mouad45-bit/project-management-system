package com.projectmanagement.backend.service;

import com.projectmanagement.backend.dto.request.ProjectCreateRequest;
import com.projectmanagement.backend.dto.request.ProjectMembersUpdateRequest;
import com.projectmanagement.backend.dto.request.ProjectUpdateRequest;
import com.projectmanagement.backend.dto.response.PageResponse;
import com.projectmanagement.backend.dto.response.ProjectDetailResponse;
import com.projectmanagement.backend.dto.response.ProjectListItemResponse;
import com.projectmanagement.backend.dto.response.ProjectMemberResponse;
import com.projectmanagement.backend.dto.response.ProjectSummaryResponse;
import com.projectmanagement.backend.entity.Project;
import com.projectmanagement.backend.enums.ProjectStatus;
import com.projectmanagement.backend.exception.ProjectBusinessException;
import com.projectmanagement.backend.exception.ProjectNotFoundException;
import com.projectmanagement.backend.mapper.ProjectMapper;
import com.projectmanagement.backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final ProjectMemberService projectMemberService;
    private final ProjectCodeGeneratorService projectCodeGeneratorService;

    @Transactional(readOnly = true)
    public PageResponse<ProjectListItemResponse> getProjects(
            String search,
            ProjectStatus status,
            boolean archived,
            Pageable pageable
    ) {
        Page<ProjectListItemResponse> projectsPage = projectRepository
                .searchProjects(
                        normalizeSearch(search),
                        status,
                        archived,
                        pageable
                )
                .map(projectMapper::toListItemResponse);

        return PageResponse.from(projectsPage);
    }

    @Transactional(readOnly = true)
    public ProjectDetailResponse getProjectById(Long projectId) {
        return buildProjectDetailResponse(projectId);
    }

    @Transactional
    public ProjectDetailResponse createProject(ProjectCreateRequest request) {
        String generatedCode = projectCodeGeneratorService.generateNextCode();

        Project project = projectMapper.toEntity(request, generatedCode);

        projectMemberService.synchronizeProjectMembers(
                project,
                request.memberIds()
        );

        Project savedProject = projectRepository.save(project);

        return buildProjectDetailResponse(savedProject.getId());
    }

    @Transactional
    public ProjectDetailResponse updateProject(
            Long projectId,
            ProjectUpdateRequest request
    ) {
        Project project = findProjectDetailOrThrow(projectId);

        if (project.isArchived()) {
            throw ProjectBusinessException.archivedProjectModification(projectId);
        }

        projectMapper.updateEntity(project, request);

        projectMemberService.synchronizeProjectMembers(
                project,
                request.memberIds()
        );

        Project savedProject = projectRepository.save(project);

        return buildProjectDetailResponse(savedProject.getId());
    }

    @Transactional
    public void archiveProject(Long projectId) {
        Project project = findProjectOrThrow(projectId);

        if (project.isArchived()) {
            throw ProjectBusinessException.alreadyArchived(projectId);
        }

        project.archive();
        projectRepository.save(project);
    }

    @Transactional
    public void restoreProject(Long projectId) {
        Project project = findProjectOrThrow(projectId);

        if (!project.isArchived()) {
            throw ProjectBusinessException.alreadyActive(projectId);
        }

        project.restore();
        projectRepository.save(project);
    }

    @Transactional
    public List<ProjectMemberResponse> updateProjectMembers(
            Long projectId,
            ProjectMembersUpdateRequest request
    ) {
        Project project = findProjectDetailOrThrow(projectId);

        if (project.isArchived()) {
            throw ProjectBusinessException.archivedProjectModification(projectId);
        }

        projectMemberService.synchronizeProjectMembers(
                project,
                request.memberIds()
        );

        projectRepository.save(project);

        return projectMemberService.getProjectMembers(projectId);
    }

    @Transactional(readOnly = true)
    public ProjectSummaryResponse getProjectSummary(Long projectId) {
        if (!projectRepository.existsById(projectId)) {
            throw ProjectNotFoundException.byId(projectId);
        }

        return projectMapper.emptySummary();
    }

    private ProjectDetailResponse buildProjectDetailResponse(Long projectId) {
        Project project = findProjectDetailOrThrow(projectId);

        ProjectSummaryResponse summary = projectMapper.emptySummary();
        List<ProjectMemberResponse> members =
                projectMemberService.getProjectMembers(projectId);

        return projectMapper.toDetailResponse(
                project,
                summary,
                members,
                List.of()
        );
    }

    private Project findProjectOrThrow(Long projectId) {
        return projectRepository
                .findById(projectId)
                .orElseThrow(() -> ProjectNotFoundException.byId(projectId));
    }

    private Project findProjectDetailOrThrow(Long projectId) {
        return projectRepository
                .findDetailById(projectId)
                .orElseThrow(() -> ProjectNotFoundException.byId(projectId));
    }

    private String normalizeSearch(String search) {
        if (search == null || search.isBlank()) {
            return "";
        }

        return search.trim();
    }
}