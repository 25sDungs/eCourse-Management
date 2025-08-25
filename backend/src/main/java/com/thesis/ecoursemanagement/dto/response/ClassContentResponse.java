package com.thesis.ecoursemanagement.dto.response;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassContentResponse {
    private Long id;
    private String title;
    private String content;
    private Long classId;
}
