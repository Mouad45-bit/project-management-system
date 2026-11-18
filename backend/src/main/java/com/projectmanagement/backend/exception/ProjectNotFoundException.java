package com.projectmanagement.backend.exception;

public class ProjectNotFoundException extends RuntimeException {

    public ProjectNotFoundException(String message) {
        super(message);
    }

    public static ProjectNotFoundException byId(Long projectId) {
        return new ProjectNotFoundException(
                "Aucun projet trouvé avec l'identifiant " + projectId + "."
        );
    }

    public static ProjectNotFoundException byCode(String code) {
        return new ProjectNotFoundException(
                "Aucun projet trouvé avec le code " + code + "."
        );
    }
}