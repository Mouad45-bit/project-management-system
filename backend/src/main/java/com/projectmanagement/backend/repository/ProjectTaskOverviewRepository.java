package com.projectmanagement.backend.repository;

import com.projectmanagement.backend.entity.ProjectTaskOverviewItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectTaskOverviewRepository extends JpaRepository<ProjectTaskOverviewItem, Long> {

    List<ProjectTaskOverviewItem> findByProject_IdOrderByDisplayOrderAscIdAsc(Long projectId);
}