package com.projectmanagement.backend.dto.response;

import java.time.LocalDateTime;
import java.util.Map;

public record ApiErrorResponse(
        LocalDateTime timestamp,
        int status,
        String error,
        String message,
        String path,
        Map<String, String> validationErrors
) {

    public ApiErrorResponse {
        validationErrors = validationErrors == null
                ? Map.of()
                : Map.copyOf(validationErrors);
    }

    public ApiErrorResponse(
            LocalDateTime timestamp,
            int status,
            String error,
            String message,
            String path
    ) {
        this(timestamp, status, error, message, path, Map.of());
    }
}