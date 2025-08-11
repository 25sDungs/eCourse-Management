package com.thesis.ecoursemanagement.service;

import com.thesis.ecoursemanagement.dto.request.ApiResponse;
import com.thesis.ecoursemanagement.dto.request.UserCreateRequest;
import com.thesis.ecoursemanagement.dto.request.UserUpdateRequest;
import com.thesis.ecoursemanagement.dto.response.UserResponse;
import com.thesis.ecoursemanagement.mapper.UserMapper;
import com.thesis.ecoursemanagement.model.Role;
import com.thesis.ecoursemanagement.model.RoleName;
import com.thesis.ecoursemanagement.model.User;
import com.thesis.ecoursemanagement.repository.RoleRepository;
import com.thesis.ecoursemanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public UserResponse createUser(UserCreateRequest request) {
        if (userRepository.existsByUsername(request.getUsername()))
            throw new RuntimeException("Username existed!");

        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        Role defaultRole = roleRepository.findByName(RoleName.ROLE_STUDENT)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        user.getRoles().add(defaultRole);

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public UserResponse updateUser(String userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        userMapper.updateUser(user, request);
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {

        }

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public List<UserResponse> getUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserResponse)
                .collect(Collectors.toList());
    }

    public UserResponse findUserId(String id) {
        return userMapper.toUserResponse(userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found!")));
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
