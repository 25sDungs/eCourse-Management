package com.thesis.ecoursemanagement.dto.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class LearningPathResponse {
    private Long id;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String studentUsername;
}
