package com.thesis.ecoursemanagement.controller;

import com.thesis.ecoursemanagement.dto.request.ApiResponse;
import com.thesis.ecoursemanagement.dto.request.ClassCreateRequest;
import com.thesis.ecoursemanagement.dto.response.ClassResponse;
import com.thesis.ecoursemanagement.model.ClassEntity;
import com.thesis.ecoursemanagement.service.ClassService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/classes")
@RequiredArgsConstructor
public class ClassController {

    private final ClassService classService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ClassResponse>>> getAllClasses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<ClassResponse> classes = classService.getAllClasses(page, size);
        ApiResponse<Page<ClassResponse>> response = ApiResponse.<Page<ClassResponse>>builder()
                .codeResponse(HttpStatus.OK.value())
                .message("Classes retrieved successfully")
                .result(classes)
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ClassEntity> createClass(@RequestBody ClassEntity classEntity) {
        return ResponseEntity.ok(classService.createClass(classEntity));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ClassResponse>> getClassById(@PathVariable Long id) {
        return classService.getClassById(id)
                .map(classResponse -> {
                    ApiResponse<ClassResponse> response = ApiResponse.<ClassResponse>builder()
                            .codeResponse(HttpStatus.OK.value())
                            .message("Class retrieved successfully")
                            .result(classResponse)
                            .build();
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.<ClassResponse>builder()
                                .codeResponse(HttpStatus.NOT_FOUND.value())
                                .message("Class not found")
                                .result(null)
                                .build()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ClassResponse>> updateClass(
            @PathVariable Long id,
            @Valid @RequestBody ClassCreateRequest request) {
        ClassResponse classResponse = classService.updateClass(id, request);

        ApiResponse<ClassResponse> response = ApiResponse.<ClassResponse>builder()
                .codeResponse(HttpStatus.OK.value())
                .message("Class updated successfully")
                .result(classResponse)
                .build();

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public String deleteClass(@PathVariable Long id) {
        classService.deleteClass(id);
        return "Class Deleted";
    }
}