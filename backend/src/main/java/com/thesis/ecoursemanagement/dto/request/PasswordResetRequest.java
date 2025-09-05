package com.thesis.ecoursemanagement.dto.request;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PasswordResetRequest {
    private String email;
    private String token;
    private String newPassword;
}
