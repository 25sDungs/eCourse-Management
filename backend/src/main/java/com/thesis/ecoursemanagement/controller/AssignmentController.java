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
            @PathVariable Long classId) {
        return assignmentService.getAllAssignments(classId);
    }

    @GetMapping("/{assignmentId}")
    public AssignmentResponse getAssignmentById(
            @PathVariable Long classId,
            @PathVariable Long assignmentId) {
        return assignmentService.getAssignmentById(classId, assignmentId);
    }

    @PostMapping
    public AssignmentResponse createAssignment(
            @PathVariable Long classId,
            @RequestBody AssignmentRequest request) {
        return assignmentService.createAssignment(classId, request);
    }

    @PutMapping("/{assignmentId}")
    public AssignmentResponse updateAssignment(
            @PathVariable Long classId,
            @PathVariable Long assignmentId,
            @RequestBody AssignmentRequest request) {
        return assignmentService.updateAssignment(classId, assignmentId, request);
    }

    @DeleteMapping("/{assignmentId}")
    public String deleteAssignment(
            @PathVariable Long classId,
            @PathVariable Long assignmentId) {
        assignmentService.deleteAssignment(classId, assignmentId);
        return "Assignment deleted!";
    }
}
