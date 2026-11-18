package com.projectmanagement.backend.service;

import com.projectmanagement.backend.repository.ProjectMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class WorkloadService {

    private static final int DEFAULT_WORKLOAD_CAPACITY = 6;

    private final ProjectMemberRepository projectMemberRepository;

    @Transactional(readOnly = true)
    public int calculateCurrentWorkload(Long userId) {
        if (userId == null) {
            return 0;
        }

        long activeProjectsCount =
                projectMemberRepository.countByUser_IdAndProject_ArchivedFalse(userId);

        return Math.toIntExact(Math.min(activeProjectsCount, Integer.MAX_VALUE));
    }

    public int getDefaultWorkloadCapacity() {
        return DEFAULT_WORKLOAD_CAPACITY;
    }
}