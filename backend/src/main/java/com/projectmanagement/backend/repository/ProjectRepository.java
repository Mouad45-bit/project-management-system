package com.projectmanagement.backend.repository;

import com.projectmanagement.backend.entity.Project;
import com.projectmanagement.backend.enums.ProjectStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    Optional<Project> findByCode(String code);

    boolean existsByCode(String code);

    long countByArchivedFalse();

    long countByArchivedTrue();

    @EntityGraph(attributePaths = {"members", "members.user"})
    @Query("""
            select project
            from Project project
            where project.id = :id
            """)
    Optional<Project> findDetailById(@Param("id") Long id);

    @Query("""
            select project
            from Project project
            where project.archived = :archived
              and (:status is null or project.status = :status)
              and (
                    :search is null
                    or :search = ''
                    or lower(project.name) like lower(concat('%', :search, '%'))
                    or lower(project.code) like lower(concat('%', :search, '%'))
                  )
            """)
    Page<Project> searchProjects(
            @Param("search") String search,
            @Param("status") ProjectStatus status,
            @Param("archived") boolean archived,
            Pageable pageable
    );
}