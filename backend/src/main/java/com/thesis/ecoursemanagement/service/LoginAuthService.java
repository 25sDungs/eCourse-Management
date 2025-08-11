package com.thesis.ecoursemanagement.service;

import com.thesis.ecoursemanagement.dto.request.LoginRequest;
import com.thesis.ecoursemanagement.dto.response.LoginResponse;
import com.thesis.ecoursemanagement.model.User;
import com.thesis.ecoursemanagement.repository.UserRepository;
import com.thesis.ecoursemanagement.security.JwtUtil;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class LoginAuthService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    public LoginAuthService(UserRepository userRepository, JwtUtil jwtUtil, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadCredentialsException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid username or password");
        }

        String token = jwtUtil.generateToken(user);
        return LoginResponse.builder()
                .token(token)
                .username(user.getUsername())
                .build();
    }
}