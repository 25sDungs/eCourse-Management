package com.thesis.ecoursemanagement.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class LearningPathDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long userId;
}
