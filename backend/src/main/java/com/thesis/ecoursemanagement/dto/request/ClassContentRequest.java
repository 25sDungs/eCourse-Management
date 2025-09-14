package com.thesis.ecoursemanagement.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassContentRequest {
    private String title;
    private String content;
}
