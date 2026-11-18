package com.projectmanagement.backend.mapper;

import com.projectmanagement.backend.dto.response.AvailableUserResponse;
import com.projectmanagement.backend.dto.response.ProjectMemberResponse;
import com.projectmanagement.backend.entity.ProjectMember;
import com.projectmanagement.backend.entity.User;
import org.springframework.stereotype.Component;

@Component
public class ProjectMemberMapper {

    private static final int DEFAULT_WORKLOAD_CAPACITY = 6;

    public ProjectMemberResponse toProjectMemberResponse(ProjectMember member) {
        return toProjectMemberResponse(
                member,
                0,
                DEFAULT_WORKLOAD_CAPACITY
        );
    }

    public ProjectMemberResponse toProjectMemberResponse(
            ProjectMember member,
            int workloadCurrent,
            int workloadCapacity
    ) {
        if (member == null || member.getUser() == null) {
            return null;
        }

        return toProjectMemberResponse(
                member.getUser(),
                workloadCurrent,
                workloadCapacity
        );
    }

    public ProjectMemberResponse toProjectMemberResponse(
            User user,
            int workloadCurrent,
            int workloadCapacity
    ) {
        if (user == null) {
            return null;
        }

        int normalizedWorkloadCurrent = normalizeWorkloadValue(workloadCurrent);
        int normalizedWorkloadCapacity = normalizeWorkloadValue(workloadCapacity);

        return new ProjectMemberResponse(
                user.getId(),
                user.getFullName(),
                user.getRoleLabel(),
                normalizedWorkloadCurrent,
                normalizedWorkloadCapacity,
                calculateWorkloadPercent(
                        normalizedWorkloadCurrent,
                        normalizedWorkloadCapacity
                ),
                isOverloaded(
                        normalizedWorkloadCurrent,
                        normalizedWorkloadCapacity
                )
        );
    }

    public AvailableUserResponse toAvailableUserResponse(User user) {
        return toAvailableUserResponse(
                user,
                0,
                DEFAULT_WORKLOAD_CAPACITY
        );
    }

    public AvailableUserResponse toAvailableUserResponse(
            User user,
            int workloadCurrent,
            int workloadCapacity
    ) {
        if (user == null) {
            return null;
        }

        int normalizedWorkloadCurrent = normalizeWorkloadValue(workloadCurrent);
        int normalizedWorkloadCapacity = normalizeWorkloadValue(workloadCapacity);

        return new AvailableUserResponse(
                user.getId(),
                user.getFullName(),
                user.getRoleLabel(),
                normalizedWorkloadCurrent,
                normalizedWorkloadCapacity,
                calculateWorkloadPercent(
                        normalizedWorkloadCurrent,
                        normalizedWorkloadCapacity
                ),
                isOverloaded(
                        normalizedWorkloadCurrent,
                        normalizedWorkloadCapacity
                )
        );
    }

    private int normalizeWorkloadValue(int value) {
        return Math.max(value, 0);
    }

    private int calculateWorkloadPercent(int workloadCurrent, int workloadCapacity) {
        if (workloadCapacity <= 0) {
            return 0;
        }

        int percent = (int) Math.round((workloadCurrent * 100.0) / workloadCapacity);

        return Math.min(percent, 100);
    }

    private boolean isOverloaded(int workloadCurrent, int workloadCapacity) {
        return workloadCapacity > 0 && workloadCurrent >= workloadCapacity;
    }
}