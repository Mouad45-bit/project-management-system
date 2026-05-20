package com.projectmanagement.backend.entity;

import com.projectmanagement.backend.enums.ProjectTaskStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(
        name = "project_task_overview_items",
        indexes = {
                @Index(name = "idx_project_task_overview_project_id", columnList = "project_id"),
                @Index(name = "idx_project_task_overview_status", columnList = "status")
        }
)
@Getter
@Setter
@NoArgsConstructor
public class ProjectTaskOverviewItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(name = "title", nullable = false, length = 180)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private ProjectTaskStatus status;

    @Column(name = "assignee_name", length = 150)
    private String assigneeName;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "late", nullable = false)
    private boolean late;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;
}