package com.projectmanagement.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
        name = "project_metrics",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_project_metrics_project_id",
                        columnNames = "project_id"
                )
        },
        indexes = {
                @Index(
                        name = "idx_project_metrics_project_id",
                        columnList = "project_id"
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
public class ProjectMetrics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(name = "progress_percent", nullable = false)
    private int progressPercent;

    @Column(name = "todo_count", nullable = false)
    private int todoCount;

    @Column(name = "in_progress_count", nullable = false)
    private int inProgressCount;

    @Column(name = "to_validate_count", nullable = false)
    private int toValidateCount;

    @Column(name = "completed_count", nullable = false)
    private int completedCount;

    @Column(name = "blocked_count", nullable = false)
    private int blockedCount;

    @Column(name = "late_count", nullable = false)
    private int lateCount;
}