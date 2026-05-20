package com.projectmanagement.backend.controller;

import com.projectmanagement.backend.dto.response.AvailableUserResponse;
import com.projectmanagement.backend.service.ProjectMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserLookupController {

    private final ProjectMemberService projectMemberService;

    @GetMapping("/available")
    public ResponseEntity<List<AvailableUserResponse>> getAvailableUsers(
            @RequestParam(defaultValue = "") String search
    ) {
        return ResponseEntity.ok(projectMemberService.getAvailableUsers(search));
    }
}