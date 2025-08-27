package com.thesis.ecoursemanagement.controller;

import com.thesis.ecoursemanagement.dto.response.ApiResponse;
import com.thesis.ecoursemanagement.dto.request.ClassRequest;
import com.thesis.ecoursemanagement.dto.response.ClassResponse;
import com.thesis.ecoursemanagement.service.ClassService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses/{courseId}/classes")
@RequiredArgsConstructor
public class ClassController {

    private final ClassService classService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ClassResponse>>> getAllClassesByCourse(@PathVariable Long courseId) {
        List<ClassResponse> classes = classService.getAllClassesByCourse(courseId);
        return ResponseEntity.ok(ApiResponse.<List<ClassResponse>>builder()
                .codeResponse(HttpStatus.OK.value())
                .message("Classes retrieved successfully")
                .result(classes)
                .build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ClassResponse>> createClass(
            @PathVariable Long courseId,
            @Valid @RequestBody ClassRequest request) {
        ClassResponse classResponse = classService.createClass(courseId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<ClassResponse>builder()
                .codeResponse(HttpStatus.CREATED.value())
                .message("Class created successfully")
                .result(classResponse)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ClassResponse>> getClassById(
            @PathVariable Long courseId, @PathVariable Long id) {
        ClassResponse classResponse = classService.getClassById(courseId, id);
        return ResponseEntity.ok(ApiResponse.<ClassResponse>builder()
                .codeResponse(HttpStatus.OK.value())
                .message("Class retrieved successfully")
                .result(classResponse)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ClassResponse>> updateClass(
            @PathVariable Long courseId, @PathVariable Long id,
            @Valid @RequestBody ClassRequest request) {
        ClassResponse classResponse = classService.updateClass(courseId, id, request);
        return ResponseEntity.ok(ApiResponse.<ClassResponse>builder()
                .codeResponse(HttpStatus.OK.value())
                .message("Class updated successfully")
                .result(classResponse)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteClass(@PathVariable Long courseId, @PathVariable Long id) {
        classService.deleteClass(courseId, id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ApiResponse.<Void>builder()
                .codeResponse(HttpStatus.NO_CONTENT.value()).message("Class deleted successfully").result(null)
                .build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<ClassResponse>> updateClassTeacher(
            @PathVariable Long id,
            @RequestBody Map<String, String> requestBody) {

        String teacherIdStr = requestBody.get("teacherId");

        ClassResponse updated = classService.updateClassTeacher(id, teacherIdStr);

        return ResponseEntity.ok(ApiResponse.<ClassResponse>builder()
                .codeResponse(HttpStatus.OK.value())
                .message("Class teacher updated successfully")
                .result(updated)
                .build());
    }

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<ClassResponse>> getClassesByTeacher(@PathVariable String teacherId) {
        return ResponseEntity.ok(classService.getClassesByTeacher(teacherId));
    }
}