package com.thesis.ecoursemanagement.repository;
import com.thesis.ecoursemanagement.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByClassEntityIdAndClassEntityCourseId(Long classId, Long courseId);

    Optional<Assignment> findByIdAndClassEntityIdAndClassEntityCourseId(Long id, Long classId, Long courseId);
}