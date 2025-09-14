package com.thesis.ecoursemanagement.controller;

import com.thesis.ecoursemanagement.dto.request.CourseRequest;
import com.thesis.ecoursemanagement.dto.response.ApiResponse;
import com.thesis.ecoursemanagement.dto.response.CourseResponse;
import com.thesis.ecoursemanagement.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CourseResponse>>> getAllCourses() {
        return ResponseEntity.ok(
                new ApiResponse<>(200, "Success", courseService.getAllCourses())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponse>> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(
                new ApiResponse<>(200, "Success", courseService.getCourseById(id))
        );
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CourseResponse>> createCourse(@RequestBody CourseRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ApiResponse<>(201, "Created", courseService.createCourse(request))
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponse>> updateCourse(
            @PathVariable Long id,
            @RequestBody CourseRequest request) {
        return ResponseEntity.ok(
                new ApiResponse<>(200, "Updated", courseService.updateCourse(id, request))
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok(new ApiResponse<>(200, "Deleted", null));
    }
}

