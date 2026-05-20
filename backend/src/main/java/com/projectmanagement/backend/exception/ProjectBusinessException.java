package com.projectmanagement.backend.exception;

public class ProjectBusinessException extends RuntimeException {

    public ProjectBusinessException(String message) {
        super(message);
    }

    public static ProjectBusinessException archivedProjectModification(Long projectId) {
        return new ProjectBusinessException(
                "Le projet " + projectId + " est archivé et ne peut pas être modifié."
        );
    }

    public static ProjectBusinessException alreadyArchived(Long projectId) {
        return new ProjectBusinessException(
                "Le projet " + projectId + " est déjà archivé."
        );
    }

    public static ProjectBusinessException alreadyActive(Long projectId) {
        return new ProjectBusinessException(
                "Le projet " + projectId + " est déjà actif."
        );
    }

    public static ProjectBusinessException invalidMembersSelection() {
        return new ProjectBusinessException(
                "La sélection des membres contient des utilisateurs inexistants ou inactifs."
        );
    }

    public static ProjectBusinessException duplicatedProjectCode(String code) {
        return new ProjectBusinessException(
                "Le code projet " + code + " existe déjà."
        );
    }
}