package com.projectmanagement.backend.controller;

import com.projectmanagement.backend.dto.request.ProjectCreateRequest;
import com.projectmanagement.backend.dto.request.ProjectMembersUpdateRequest;
import com.projectmanagement.backend.dto.request.ProjectUpdateRequest;
import com.projectmanagement.backend.dto.response.PageResponse;
import com.projectmanagement.backend.dto.response.ProjectDetailResponse;
import com.projectmanagement.backend.dto.response.ProjectListItemResponse;
import com.projectmanagement.backend.dto.response.ProjectMemberResponse;
import com.projectmanagement.backend.dto.response.ProjectSummaryResponse;
import com.projectmanagement.backend.enums.ProjectStatus;
import com.projectmanagement.backend.exception.ProjectBusinessException;
import com.projectmanagement.backend.service.ProjectService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;
import java.util.Locale;
import java.util.Set;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@Validated
public class ProjectController {

    private static final int DEFAULT_PAGE_SIZE = 10;
    private static final int MAX_PAGE_SIZE = 100;

    private static final String DEFAULT_SORT_PROPERTY = "createdAt";
    private static final Sort.Direction DEFAULT_SORT_DIRECTION = Sort.Direction.DESC;

    private static final Set<String> ALLOWED_SORT_PROPERTIES = Set.of(
            "id",
            "code",
            "name",
            "startDate",
            "plannedEndDate",
            "status",
            "archived",
            "createdAt",
            "updatedAt"
    );

    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<PageResponse<ProjectListItemResponse>> getProjects(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "false") boolean archived,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt,desc") String sort
    ) {
        Pageable pageable = buildPageable(page, size, sort);

        PageResponse<ProjectListItemResponse> response = projectService.getProjects(
                search,
                resolveStatusFilter(status),
                archived,
                pageable
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ProjectDetailResponse> createProject(
            @Valid @RequestBody ProjectCreateRequest request
    ) {
        ProjectDetailResponse createdProject = projectService.createProject(request);

        URI location = URI.create("/api/projects/" + createdProject.id());

        return ResponseEntity
                .created(location)
                .body(createdProject);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDetailResponse> getProjectById(
            @Positive(message = "L'identifiant du projet doit être positif.")
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDetailResponse> updateProject(
            @Positive(message = "L'identifiant du projet doit être positif.")
            @PathVariable Long id,

            @Valid @RequestBody ProjectUpdateRequest request
    ) {
        return ResponseEntity.ok(projectService.updateProject(id, request));
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<Void> archiveProject(
            @Positive(message = "L'identifiant du projet doit être positif.")
            @PathVariable Long id
    ) {
        projectService.archiveProject(id);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/restore")
    public ResponseEntity<Void> restoreProject(
            @Positive(message = "L'identifiant du projet doit être positif.")
            @PathVariable Long id
    ) {
        projectService.restoreProject(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/members")
    public ResponseEntity<List<ProjectMemberResponse>> updateProjectMembers(
            @Positive(message = "L'identifiant du projet doit être positif.")
            @PathVariable Long id,

            @Valid @RequestBody ProjectMembersUpdateRequest request
    ) {
        return ResponseEntity.ok(projectService.updateProjectMembers(id, request));
    }

    @GetMapping("/{id}/summary")
    public ResponseEntity<ProjectSummaryResponse> getProjectSummary(
            @Positive(message = "L'identifiant du projet doit être positif.")
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(projectService.getProjectSummary(id));
    }

    private ProjectStatus resolveStatusFilter(String status) {
        if (status == null || status.isBlank() || status.equalsIgnoreCase("ALL")) {
            return null;
        }

        try {
            return ProjectStatus.valueOf(status.trim().toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException exception) {
            throw new ProjectBusinessException(
                    "Le statut projet '" + status + "' est invalide."
            );
        }
    }

    private Pageable buildPageable(int page, int size, String sort) {
        if (page < 0) {
            throw new ProjectBusinessException(
                    "Le numéro de page doit être supérieur ou égal à 0."
            );
        }

        if (size <= 0) {
            throw new ProjectBusinessException(
                    "La taille de page doit être supérieure à 0."
            );
        }

        int safeSize = Math.min(size, MAX_PAGE_SIZE);

        return PageRequest.of(page, safeSize, resolveSort(sort));
    }

    private Sort resolveSort(String sort) {
        if (sort == null || sort.isBlank()) {
            return Sort.by(DEFAULT_SORT_DIRECTION, DEFAULT_SORT_PROPERTY);
        }

        String[] parts = sort.split(",");
        String property = parts[0].trim();

        if (!ALLOWED_SORT_PROPERTIES.contains(property)) {
            throw new ProjectBusinessException(
                    "Le tri par le champ '" + property + "' n'est pas autorisé."
            );
        }

        Sort.Direction direction = DEFAULT_SORT_DIRECTION;

        if (parts.length > 1 && !parts[1].isBlank()) {
            try {
                direction = Sort.Direction.fromString(parts[1].trim());
            } catch (IllegalArgumentException exception) {
                throw new ProjectBusinessException(
                        "La direction de tri '" + parts[1] + "' est invalide."
                );
            }
        }

        return Sort.by(direction, property);
    }
}