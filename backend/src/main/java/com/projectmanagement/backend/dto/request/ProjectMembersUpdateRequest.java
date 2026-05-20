package com.projectmanagement.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

public record ProjectMembersUpdateRequest(

        @NotNull(message = "La liste des membres est obligatoire.")
        List<@Positive(message = "L'identifiant d'un membre doit être positif.") Long> memberIds
) {

    public ProjectMembersUpdateRequest {
        memberIds = memberIds == null ? List.of() : List.copyOf(memberIds);
    }
}