package com.thesis.ecoursemanagement.dto.response;

import com.thesis.ecoursemanagement.model.ClassEntity;
import com.thesis.ecoursemanagement.model.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EnrollmentResponse {
    private Long id;
    private String  studentId;
    private Long classId;
    private String className;
    private LocalDate enrollTime;
    private String status;
}
