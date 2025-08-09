package com.thesis.ecoursemanagement.controller;

import com.thesis.ecoursemanagement.dto.request.UserCreateRequest;
import com.thesis.ecoursemanagement.dto.request.UserUpdateRequest;
import com.thesis.ecoursemanagement.model.User;
import com.thesis.ecoursemanagement.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    User createUser(@RequestBody @Valid UserCreateRequest request) {
        return userService.createUser(request);
    }

    @GetMapping
    List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{userId}")
    User findUser(@PathVariable("userId") String userId) {
        return userService.findUserId(userId);
    }

    @PutMapping("/{userId}")
    User updateUser(@PathVariable("userId") String userId, @RequestBody UserUpdateRequest request) {
        return userService.updateUser(userId, request);
    }

    @DeleteMapping("/{userId}")
    String deleteUser(@PathVariable("userId") String userId){
        userService.deleteUser(userId);
        return "User đã bị xóa";
    }
}
