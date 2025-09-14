package com.thesis.ecoursemanagement.controller;

import com.thesis.ecoursemanagement.dto.request.ClassContentRequest;
import com.thesis.ecoursemanagement.dto.response.ClassContentResponse;
import com.thesis.ecoursemanagement.service.ClassContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses/{courseId}/classes/{classId}/contents")
@RequiredArgsConstructor
public class ClassContentController {

    private final ClassContentService classContentService;

    @GetMapping
    public List<ClassContentResponse> getContents(@PathVariable Long classId) {
        return classContentService.getContentsByClass(classId);
    }

    @GetMapping("/{contentId}")
    public ClassContentResponse getContent(@PathVariable Long classId,
                                           @PathVariable Long contentId) {
        return classContentService.getContentById(classId, contentId);
    }

    @PostMapping
    public ClassContentResponse createContent(@PathVariable Long classId,
                                              @RequestBody ClassContentRequest request) {
        return classContentService.createContent(classId, request);
    }

    @PatchMapping("/{contentId}")
    public ClassContentResponse updateContent(
            @PathVariable Long classId,
            @PathVariable Long contentId,
            @RequestBody ClassContentRequest request) {
        return classContentService.updateContent(classId, contentId, request);
    }

    @DeleteMapping("/{contentId}")
    public String deleteContent(
            @PathVariable Long classId,
            @PathVariable Long contentId) {
        classContentService.deleteContent(classId, contentId);
        return "Content deleted!";
    }

}
