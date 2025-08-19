package com.thesis.ecoursemanagement.dto.request;

import lombok.Data;

@Data
public class EnrollmentRequest {
    private Long classId;
    private String status;
}
