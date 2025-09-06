package com.thesis.ecoursemanagement.mapper;


import com.thesis.ecoursemanagement.dto.request.UserCreateRequest;
import com.thesis.ecoursemanagement.dto.request.UserUpdateRequest;
import com.thesis.ecoursemanagement.dto.response.UserResponse;
import com.thesis.ecoursemanagement.model.Role;
import com.thesis.ecoursemanagement.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreateRequest request);

    @Mapping(target = "role", expression = "java(mapRole(user.getRoles()))")
    UserResponse toUserResponse(User user);

    default String mapRole(Set<Role> roles) {
        if (roles == null || roles.isEmpty()) {
            return null;
        }
        return roles.iterator().next().getName().name();
    }

    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
