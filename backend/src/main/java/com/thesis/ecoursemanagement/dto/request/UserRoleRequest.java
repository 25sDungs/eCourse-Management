package com.thesis.ecoursemanagement.dto.request;

import com.thesis.ecoursemanagement.model.RoleName;
import lombok.Data;

@Data
public class UserRoleRequest {
    private RoleName roleName;
}
