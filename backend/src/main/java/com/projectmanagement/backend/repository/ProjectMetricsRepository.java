package com.projectmanagement.backend.repository;

import com.projectmanagement.backend.entity.ProjectMetrics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectMetricsRepository extends JpaRepository<ProjectMetrics, Long> {

    Optional<ProjectMetrics> findByProject_Id(Long projectId);
}