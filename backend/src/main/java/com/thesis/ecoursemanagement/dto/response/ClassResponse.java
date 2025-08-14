package com.thesis.ecoursemanagement.dto.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ClassResponse {
    private Long id;
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String teacherName;
}
