package com.thesis.ecoursemanagement.controller;

import com.thesis.ecoursemanagement.dto.LearningPathDTO;
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
    public List<LearningPathDTO> getMyLearningPaths() {
        return learningPathService.getMyLearningPaths();
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_STUDENT')")
    public LearningPathDTO create(@RequestBody LearningPathDTO dto) {
        return learningPathService.createLearningPath(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_STUDENT')")
    public LearningPathDTO update(@PathVariable Long id, @RequestBody LearningPathDTO dto) {
        return learningPathService.updateLearningPath(id, dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_STUDENT')")
    public String delete(@PathVariable Long id) {
        learningPathService.deleteLearningPath(id);
        return "Path Deleted!";
    }
}
