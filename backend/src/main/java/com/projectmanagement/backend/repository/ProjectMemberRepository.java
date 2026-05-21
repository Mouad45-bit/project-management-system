package com.projectmanagement.backend.repository;

import com.projectmanagement.backend.entity.ProjectMember;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Long> {

    @EntityGraph(attributePaths = {"user"})
    List<ProjectMember> findByProject_IdOrderByAssignedAtAsc(Long projectId);

    @EntityGraph(attributePaths = {"project"})
    List<ProjectMember> findByUser_IdOrderByAssignedAtDesc(Long userId);

    boolean existsByProject_IdAndUser_Id(Long projectId, Long userId);

    long countByProject_Id(Long projectId);

    long countByUser_IdAndProject_ArchivedFalse(Long userId);

    void deleteByProject_Id(Long projectId);

    void deleteByProject_IdAndUser_Id(Long projectId, Long userId);

    @Query("""
            select member.user.id
            from ProjectMember member
            where member.project.id = :projectId
            """)
    List<Long> findUserIdsByProjectId(@Param("projectId") Long projectId);
}