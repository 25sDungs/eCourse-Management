package com.thesis.ecoursemanagement.controller;

import com.thesis.ecoursemanagement.dto.request.SubmissionRequest;
import com.thesis.ecoursemanagement.dto.request.SubmitScoreRequest;
import com.thesis.ecoursemanagement.dto.response.SubmissionResponse;
import com.thesis.ecoursemanagement.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/courses/{courseId}/classes/{classId}/assignments/{assignmentId}/submissions")
@RequiredArgsConstructor
public class SubmissionController {
    private final SubmissionService submissionService;

    @GetMapping("/me")
    @PreAuthorize("hasRole('ROLE_STUDENT')")
    public ResponseEntity<SubmissionResponse> getMySubmission(@PathVariable Long assignmentId) {
        return ResponseEntity.ok(submissionService.getMySubmission(assignmentId));
    }

    @GetMapping("/{id}/download")
    @PreAuthorize("hasAnyAuthority('ROLE_TEACHER', 'ROLE_ADMIN')")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long id) {
        byte[] fileData = submissionService.downloadFile(id);
        String fileName = submissionService.getFileName(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(fileData);
    }

    @GetMapping
    public ResponseEntity<List<SubmissionResponse>> getSubmissionsByTopic(@PathVariable Long assignmentId) {
        return ResponseEntity.ok(submissionService.getSubmissionsByAssignment(assignmentId));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_STUDENT')")
    public ResponseEntity<SubmissionResponse> submitAssignment(@PathVariable Long assignmentId, @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(submissionService.submitAssignment(assignmentId, file));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_TEACHER', 'ROLE_ADMIN')")
    public ResponseEntity<SubmissionResponse> scoreSubmit(
            @PathVariable Long id, @RequestBody SubmitScoreRequest request) {
        return ResponseEntity.ok(submissionService.scoreSubmit(id, request));
    }
}
