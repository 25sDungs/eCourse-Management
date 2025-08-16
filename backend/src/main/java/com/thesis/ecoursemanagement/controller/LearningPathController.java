package com.thesis.ecoursemanagement.controller;

import com.thesis.ecoursemanagement.dto.request.LearningPathRequest;
import com.thesis.ecoursemanagement.dto.response.LearningPathResponse;
import com.thesis.ecoursemanagement.service.LearningPathService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learning-paths")
@RequiredArgsConstructor
public class LearningPathController {
    private final LearningPathService learningPathService;

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_STUDENT')")
    public List<LearningPathResponse> getMyLearningPaths() {
        return learningPathService.getMyLearningPaths();
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_STUDENT')")
    public LearningPathResponse create(@RequestBody LearningPathRequest request) {
        return learningPathService.createLearningPath(request);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_STUDENT')")
    public LearningPathResponse update(@PathVariable Long id, @RequestBody LearningPathRequest request) {
        return learningPathService.updateLearningPath(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_STUDENT')")
    public String delete(@PathVariable Long id) {
        learningPathService.deleteLearningPath(id);
        return "Path Deleted!";
    }
}
