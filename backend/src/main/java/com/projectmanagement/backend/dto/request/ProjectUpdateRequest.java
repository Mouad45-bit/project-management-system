package com.projectmanagement.backend.dto.request;

import com.projectmanagement.backend.enums.ProjectStatus;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public record ProjectUpdateRequest(

        @NotBlank(message = "Le nom du projet est obligatoire.")
        @Size(max = 150, message = "Le nom du projet ne doit pas dépasser 150 caractères.")
        String name,

        @Size(max = 5000, message = "La description ne doit pas dépasser 5000 caractères.")
        String description,

        @NotNull(message = "La date de début est obligatoire.")
        LocalDate startDate,

        LocalDate plannedEndDate,

        @NotNull(message = "Le statut est obligatoire.")
        ProjectStatus status,

        List<@Positive(message = "L'identifiant d'un membre doit être positif.") Long> memberIds
) {

    public ProjectUpdateRequest {
        memberIds = memberIds == null ? List.of() : List.copyOf(memberIds);
    }

    @AssertTrue(message = "La date de fin prévue doit être supérieure à la date de début.")
    public boolean isDateRangeValid() {
        if (startDate == null || plannedEndDate == null) {
            return true;
        }

        return plannedEndDate.isAfter(startDate);
    }
}