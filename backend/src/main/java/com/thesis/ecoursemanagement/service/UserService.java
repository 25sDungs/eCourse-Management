package com.thesis.ecoursemanagement.service;

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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final CloudinaryService cloudinaryService;

    public UserResponse createUser(UserCreateRequest request) {
        if (userRepository.existsByUsername(request.getUsername()))
            throw new RuntimeException("Username existed!");

        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        MultipartFile avatarFile = request.getAvatar();
        if (avatarFile != null && !avatarFile.isEmpty()) {
            try {
                String imageUrl = cloudinaryService.uploadFile(avatarFile);
                user.setAvatarUrl(imageUrl);
            } catch (IOException e) {
                throw new RuntimeException("Upload avatar failed", e);
            }
        }
        Role defaultRole = roleRepository.findByName(RoleName.ROLE_STUDENT)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        user.getRoles().add(defaultRole);

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public UserResponse updateUser(String userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        if (request.getFirstName() != null) user.setFirstName(request.getFirstName());
        if (request.getLastName() != null) user.setLastName(request.getLastName());
        if (request.getDob() != null) user.setDob(request.getDob());
        if (request.getPassword() != null) user.setPassword(passwordEncoder.encode(request.getPassword()));
        MultipartFile avatarFile = request.getAvatar();
        if (avatarFile != null && !avatarFile.isEmpty()) {
            try {
                String imageUrl = cloudinaryService.uploadFile(avatarFile);
                user.setAvatarUrl(imageUrl);
            } catch (IOException e) {
                throw new RuntimeException("Upload avatar failed", e);
            }
        }
        return userMapper.toUserResponse(userRepository.save(user));
    }

    public Page<UserResponse> getUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> usersPage = userRepository.findAll(pageable);
        return usersPage.map(userMapper::toUserResponse);
    }

    public UserResponse getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return userMapper.toUserResponse(user);
    }

    public UserResponse findUserId(String id) {
        return userMapper.toUserResponse(userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found!")));
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
