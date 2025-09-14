package com.thesis.ecoursemanagement.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "class_contents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id")
    private ClassEntity classEntity;
}
