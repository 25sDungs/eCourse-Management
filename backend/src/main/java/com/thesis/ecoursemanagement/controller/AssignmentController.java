package com.thesis.ecoursemanagement.controller;

import com.thesis.ecoursemanagement.dto.request.AssignmentRequest;
import com.thesis.ecoursemanagement.dto.response.AssignmentResponse;
import com.thesis.ecoursemanagement.service.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/courses/{courseId}/classes/{classId}/assignments")
@RequiredArgsConstructor
public class AssignmentController {
    private final AssignmentService assignmentService;

    @GetMapping
    public List<AssignmentResponse> getAllAssignments(
            @PathVariable Long courseId,
            @PathVariable Long classId) {
        return assignmentService.getAllAssignments(courseId, classId);
    }

    @GetMapping("/{assignmentId}")
    public AssignmentResponse getAssignmentById(
            @PathVariable Long courseId,
            @PathVariable Long classId,
            @PathVariable Long assignmentId) {
        return assignmentService.getAssignmentById(courseId, classId, assignmentId);
    }

    @PostMapping
    public AssignmentResponse createAssignment(
            @PathVariable Long courseId,
            @PathVariable Long classId,
            @RequestBody AssignmentRequest request) {
        return assignmentService.createAssignment(courseId, classId, request);
    }

    @PutMapping("/{assignmentId}")
    public AssignmentResponse updateAssignment(
            @PathVariable Long courseId,
            @PathVariable Long classId,
            @PathVariable Long assignmentId,
            @RequestBody AssignmentRequest request) {
        return assignmentService.updateAssignment(courseId, classId, assignmentId, request);
    }

    @DeleteMapping("/{assignmentId}")
    public String deleteAssignment(
            @PathVariable Long courseId,
            @PathVariable Long classId,
            @PathVariable Long assignmentId) {
        assignmentService.deleteAssignment(courseId, classId, assignmentId);
        return "Assignment deleted!";
    }
}
