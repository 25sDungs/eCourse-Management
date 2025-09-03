package com.thesis.ecoursemanagement.controller;

import com.thesis.ecoursemanagement.dto.request.EnrollmentRequest;
import com.thesis.ecoursemanagement.dto.response.ApiResponse;
import com.thesis.ecoursemanagement.dto.response.EnrollmentResponse;
import com.thesis.ecoursemanagement.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    @PostMapping
    public ResponseEntity<EnrollmentResponse> enroll(@RequestBody EnrollmentRequest request) {
        return ResponseEntity.ok(enrollmentService.enroll(request));
    }

    @GetMapping("/me")
    public ResponseEntity<List<EnrollmentResponse>> getMyEnrollments() {
        return ResponseEntity.ok(enrollmentService.getMyEnrollments());
    }

    @PatchMapping("/{enrollmentId}")
    public ResponseEntity<ApiResponse<EnrollmentResponse>> updateStatus(
            @PathVariable Long enrollmentId,
            @RequestBody Map<String, String> body
    ) {
        String status = body.get("status");
        EnrollmentResponse response = enrollmentService.updateStatus(enrollmentId, status);
        return ResponseEntity.ok(new ApiResponse<>(200, "Status updated", response));
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<EnrollmentResponse>> getAllEnrollments() {
        return ResponseEntity.ok(enrollmentService.getAllEnrollments());
    }

    @GetMapping("/revenue/classes/{classId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Long>> getRevenueByClass(@PathVariable Long classId) {
        return ResponseEntity.ok(new ApiResponse<>(200, "Success",enrollmentService.getRevenueByClassId(classId)));
    }

    @GetMapping("/revenue/courses/{courseId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Long>> getRevenueByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(new ApiResponse<>(200, "Success",enrollmentService.getRevenueByCourseId(courseId)));
    }

    @GetMapping("/revenue/classes")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getRevenueGroupedByClass() {
        return ResponseEntity.ok(new ApiResponse<>(200, "Success",enrollmentService.getRevenueGroupedByClass()));
    }

    @GetMapping("/revenue/courses")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getRevenueGroupedByCourse() {
        return ResponseEntity.ok(new ApiResponse<>(200, "Success",enrollmentService.getRevenueGroupedByCourse()));
    }
}
