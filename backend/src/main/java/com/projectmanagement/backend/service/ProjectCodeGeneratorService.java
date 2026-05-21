package com.projectmanagement.backend.service;

import com.projectmanagement.backend.exception.ProjectBusinessException;
import com.projectmanagement.backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProjectCodeGeneratorService {

    private static final String CODE_PREFIX = "PRJ-";
    private static final int CODE_NUMBER_SIZE = 3;
    private static final int MAX_GENERATION_ATTEMPTS = 10_000;

    private final ProjectRepository projectRepository;

    @Transactional(readOnly = true)
    public String generateNextCode() {
        long nextNumber = projectRepository.count() + 1;

        for (int attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt++) {
            String candidateCode = formatCode(nextNumber + attempt);

            if (!projectRepository.existsByCode(candidateCode)) {
                return candidateCode;
            }
        }

        throw new ProjectBusinessException(
                "Impossible de générer un code projet unique."
        );
    }

    private String formatCode(long number) {
        return CODE_PREFIX + String.format("%0" + CODE_NUMBER_SIZE + "d", number);
    }
}