package com.projectmanagement.backend.dto.response;

public record ProjectMemberResponse(
        /*
         * Important :
         * Cet id représente l'identifiant de l'utilisateur associé au projet,
         * et non l'identifiant technique de la ligne dans la table project_members.
         *
         * Cet id doit correspondre à users.id afin que le frontend puisse
         * renvoyer correctement les memberIds lors d'une création ou modification.
         */
        Long id,
        String fullName,
        String roleLabel,
        int workloadCurrent,
        int workloadCapacity,
        int workloadPercent,
        boolean overloaded
) {
}