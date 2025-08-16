package com.thesis.ecoursemanagement.controller;

import com.thesis.ecoursemanagement.dto.response.ApiResponse;
import com.thesis.ecoursemanagement.dto.request.LoginRequest;
import com.thesis.ecoursemanagement.dto.response.LoginResponse;
import com.thesis.ecoursemanagement.service.LoginAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class LoginController {
    private final LoginAuthService loginAuthService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(loginAuthService.login(request));
    }
//    @PostMapping("/login")
//    public LoginResponse login(@RequestBody @Valid LoginRequest request) {
//        return loginAuthService.login(request);
//    }
}