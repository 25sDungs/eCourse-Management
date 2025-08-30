package com.thesis.ecoursemanagement.controller;

import com.thesis.ecoursemanagement.dto.request.SubmissionRequest;
import com.thesis.ecoursemanagement.dto.request.SubmitScoreRequest;
import com.thesis.ecoursemanagement.dto.response.SubmissionResponse;
import com.thesis.ecoursemanagement.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses/{courseId}/classes/{classId}/assignments/{assignmentId}/submissions")
@RequiredArgsConstructor
public class SubmissionController {
    private final SubmissionService submissionService;

    @GetMapping
    public ResponseEntity<List<SubmissionResponse>> getSubmissionsByTopic(@PathVariable Long assignmentId) {
        return ResponseEntity.ok(submissionService.getSubmissionsByAssignment(assignmentId));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_STUDENT')")
    public ResponseEntity<SubmissionResponse> submitAssignment(@PathVariable Long assignmentId,@RequestBody SubmissionRequest request) {
        return ResponseEntity.ok(submissionService.submitAssignment(assignmentId,request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_TEACHER', 'ROLE_ADMIN')")
    public ResponseEntity<SubmissionResponse> scoreSubmit(
            @PathVariable Long id, @RequestBody SubmitScoreRequest request) {
        return ResponseEntity.ok(submissionService.scoreSubmit(id, request));
    }
}
