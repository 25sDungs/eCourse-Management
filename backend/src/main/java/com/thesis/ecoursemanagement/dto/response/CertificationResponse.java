package com.thesis.ecoursemanagement.dto.response;

import com.thesis.ecoursemanagement.model.ClassEntity;
import com.thesis.ecoursemanagement.model.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CertificationResponse {
    private Long id;
    private String studentId;
    private Long classId;
    private String content;
    private String url;
    private LocalDate issueDate;
}
