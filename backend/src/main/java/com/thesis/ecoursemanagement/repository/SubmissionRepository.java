package com.thesis.ecoursemanagement.repository;

import com.thesis.ecoursemanagement.model.Submission;
import com.thesis.ecoursemanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByAssignmentId(Long assignmentId);

    Optional<Submission> findByAssignmentIdAndStudentId(Long assignmentId, String studentId);
}
