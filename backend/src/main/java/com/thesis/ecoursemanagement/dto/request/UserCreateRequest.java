package com.thesis.ecoursemanagement.dto.request;

import com.thesis.ecoursemanagement.model.RoleName;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateRequest {
    @NotBlank(message = "Username can not be empty!")
    private String username;
    @Size(min = 6, message = "Password must be at least 6 letters!")
    private String password;
    @NotBlank(message = "FirstName can not be empty!")
    private String firstName;
    @NotBlank(message = "LastName can not be empty!")
    private String lastName;
    private LocalDate dob;
    private MultipartFile avatar;
    @NotBlank(message = "Email can not be empty!")
    private String email;
}
