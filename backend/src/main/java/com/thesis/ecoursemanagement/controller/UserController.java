package com.thesis.ecoursemanagement.controller;

import com.thesis.ecoursemanagement.dto.response.ApiResponse;
import com.thesis.ecoursemanagement.dto.request.UserCreateRequest;
import com.thesis.ecoursemanagement.dto.request.UserUpdateRequest;
import com.thesis.ecoursemanagement.dto.response.UserResponse;
import com.thesis.ecoursemanagement.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(consumes = "multipart/form-data")
    ApiResponse<UserResponse> createUser(@ModelAttribute @Valid UserCreateRequest request) {

        return ApiResponse.<UserResponse>builder()
                .codeResponse(201)
                .result(userService.createUser(request))
                .build();
    }

    @GetMapping
    public Page<UserResponse> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return userService.getUsers(page, size);
    }

    @GetMapping("/{userId}")
    UserResponse findUser(@PathVariable("userId") String userId) {
        return userService.findUserId(userId);
    }

    @PatchMapping(value = "/{userId}", consumes = "multipart/form-data")
    UserResponse updateUser(@PathVariable("userId") String userId, @ModelAttribute UserUpdateRequest request) {
        return userService.updateUser(userId, request);
    }

    @GetMapping("/me")
    public ApiResponse<UserResponse> getCurrentUser() {
        return ApiResponse.<UserResponse>builder()
                .codeResponse(200)
                .result(userService.getCurrentUser())
                .build();
    }

    @DeleteMapping("/{userId}")
    String deleteUser(@PathVariable("userId") String userId) {
        userService.deleteUser(userId);
        return "User đã bị xóa";
    }
}
