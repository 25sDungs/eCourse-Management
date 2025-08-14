package com.thesis.ecoursemanagement.service;

import com.thesis.ecoursemanagement.dto.request.ApiResponse;
import com.thesis.ecoursemanagement.dto.request.LoginRequest;
import com.thesis.ecoursemanagement.dto.response.LoginResponse;
import com.thesis.ecoursemanagement.model.User;
import com.thesis.ecoursemanagement.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class LoginAuthService {
    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final BCryptPasswordEncoder passwordEncoder;

    public LoginAuthService(UserRepository userRepository, JWTService jwtService, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public ApiResponse<LoginResponse> login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadCredentialsException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid username or password");
        }

        String token = jwtService.generateToken(user);
        LoginResponse loginResponse = LoginResponse.builder()
                .token(token)
                .username(user.getUsername())
                .build();
        return ApiResponse.<LoginResponse>builder()
                .codeResponse(200)
                .message("Login successful")
                .result(loginResponse)
                .build();
    }
}