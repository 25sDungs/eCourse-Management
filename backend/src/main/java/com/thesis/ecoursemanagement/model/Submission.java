package com.thesis.ecoursemanagement.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "submissions", uniqueConstraints = @UniqueConstraint(columnNames = {"student_id", "assignment_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] fileData;
    private String fileName;

    private LocalDateTime submitTime;
    private Float score;
    private String judge;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;

}
