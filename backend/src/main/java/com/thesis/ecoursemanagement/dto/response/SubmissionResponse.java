package com.thesis.ecoursemanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubmissionResponse {
    private Long id;
    private String fileUrl;
    private LocalDateTime submitTime;
    private String studentUsername;
    private Long assignmentId;
    private Float score;
    private String judge;
}
