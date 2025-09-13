package com.thesis.ecoursemanagement.dto.response;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentsEnrollResponse {
    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
}

