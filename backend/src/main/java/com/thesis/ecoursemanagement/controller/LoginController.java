package com.thesis.ecoursemanagement.controller;

import com.thesis.ecoursemanagement.dto.request.PasswordResetRequest;
import com.thesis.ecoursemanagement.dto.response.ApiResponse;
import com.thesis.ecoursemanagement.dto.request.LoginRequest;
import com.thesis.ecoursemanagement.dto.response.LoginResponse;
import com.thesis.ecoursemanagement.service.LoginAuthService;
import com.thesis.ecoursemanagement.service.PasswordResetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class LoginController {
    private final PasswordResetService passwordResetService;
    private final LoginAuthService loginAuthService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(loginAuthService.login(request));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(@Valid @RequestBody PasswordResetRequest request) {
        passwordResetService.createPasswordResetToken(request.getEmail());

        ApiResponse<Void> response = new ApiResponse<>(200, "Đã gửi link đặt lại mật khẩu tới email.", null);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody PasswordResetRequest request) {
        passwordResetService.resetPassword(request.getToken(), request.getNewPassword());

        ApiResponse<Void> response = new ApiResponse<>(200, "Đặt lại mật khẩu thành công.", null);
        return ResponseEntity.ok(response);
    }
}