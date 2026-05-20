package com.projectmanagement.backend.service;

import com.projectmanagement.backend.dto.response.AvailableUserResponse;
import com.projectmanagement.backend.dto.response.ProjectMemberResponse;
import com.projectmanagement.backend.entity.Project;
import com.projectmanagement.backend.entity.ProjectMember;
import com.projectmanagement.backend.entity.User;
import com.projectmanagement.backend.exception.ProjectBusinessException;
import com.projectmanagement.backend.mapper.ProjectMemberMapper;
import com.projectmanagement.backend.repository.ProjectMemberRepository;
import com.projectmanagement.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectMemberService {

    private final ProjectMemberRepository projectMemberRepository;
    private final UserRepository userRepository;
    private final ProjectMemberMapper projectMemberMapper;
    private final WorkloadService workloadService;

    @Transactional
    public void synchronizeProjectMembers(Project project, List<Long> memberIds) {
        List<Long> normalizedMemberIds = normalizeMemberIds(memberIds);
        Map<Long, User> usersById = loadActiveUsersById(normalizedMemberIds);

        removeUnselectedMembers(project, normalizedMemberIds);
        addNewSelectedMembers(project, normalizedMemberIds, usersById);
    }

    @Transactional(readOnly = true)
    public List<ProjectMemberResponse> getProjectMembers(Long projectId) {
        return projectMemberRepository
                .findByProject_IdOrderByAssignedAtAsc(projectId)
                .stream()
                .map(this::toProjectMemberResponse)
                .filter(Objects::nonNull)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<AvailableUserResponse> getAvailableUsers(String search) {
        String normalizedSearch = normalizeSearch(search);

        return userRepository
                .searchAvailableUsers(normalizedSearch)
                .stream()
                .map(this::toAvailableUserResponse)
                .filter(Objects::nonNull)
                .toList();
    }

    private ProjectMemberResponse toProjectMemberResponse(ProjectMember member) {
        User user = member.getUser();

        int workloadCurrent = workloadService.calculateCurrentWorkload(user.getId());
        int workloadCapacity = workloadService.getDefaultWorkloadCapacity();

        return projectMemberMapper.toProjectMemberResponse(
                member,
                workloadCurrent,
                workloadCapacity
        );
    }

    private AvailableUserResponse toAvailableUserResponse(User user) {
        int workloadCurrent = workloadService.calculateCurrentWorkload(user.getId());
        int workloadCapacity = workloadService.getDefaultWorkloadCapacity();

        return projectMemberMapper.toAvailableUserResponse(
                user,
                workloadCurrent,
                workloadCapacity
        );
    }

    private List<Long> normalizeMemberIds(List<Long> memberIds) {
        if (memberIds == null || memberIds.isEmpty()) {
            return List.of();
        }

        if (memberIds.stream().anyMatch(Objects::isNull)) {
            throw ProjectBusinessException.invalidMembersSelection();
        }

        return memberIds
                .stream()
                .distinct()
                .toList();
    }

    private Map<Long, User> loadActiveUsersById(List<Long> memberIds) {
        if (memberIds.isEmpty()) {
            return Map.of();
        }

        Map<Long, User> usersById = userRepository
                .findByIdInAndActiveTrue(memberIds)
                .stream()
                .collect(Collectors.toMap(
                        User::getId,
                        Function.identity(),
                        (firstUser, secondUser) -> firstUser,
                        LinkedHashMap::new
                ));

        if (usersById.size() != memberIds.size()) {
            throw ProjectBusinessException.invalidMembersSelection();
        }

        return usersById;
    }

    private void removeUnselectedMembers(Project project, List<Long> normalizedMemberIds) {
        Set<Long> selectedUserIds = new LinkedHashSet<>(normalizedMemberIds);
        Iterator<ProjectMember> iterator = project.getMembers().iterator();

        while (iterator.hasNext()) {
            ProjectMember member = iterator.next();

            if (member.getUser() == null) {
                iterator.remove();
                continue;
            }

            Long currentUserId = member.getUser().getId();

            if (!selectedUserIds.contains(currentUserId)) {
                User user = member.getUser();

                iterator.remove();
                user.getProjectMemberships().remove(member);

                member.setProject(null);
                member.setUser(null);
            }
        }
    }

    private void addNewSelectedMembers(
            Project project,
            List<Long> normalizedMemberIds,
            Map<Long, User> usersById
    ) {
        Set<Long> existingUserIds = project
                .getMembers()
                .stream()
                .filter(member -> member.getUser() != null)
                .map(member -> member.getUser().getId())
                .collect(Collectors.toSet());

        for (Long userId : normalizedMemberIds) {
            if (!existingUserIds.contains(userId)) {
                project.addMember(usersById.get(userId));
            }
        }
    }

    private String normalizeSearch(String search) {
        if (search == null || search.isBlank()) {
            return "";
        }

        return search.trim();
    }
}