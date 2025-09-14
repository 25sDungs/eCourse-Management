package com.thesis.ecoursemanagement.dto.request;

import jakarta.validation.constraints.NotBlank;
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
public class UserUpdateRequest {
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
