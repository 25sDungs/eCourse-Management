package com.thesis.ecoursemanagement.repository;
import com.thesis.ecoursemanagement.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByClassEntityId(Long classId);

    Optional<Assignment> findByIdAndClassEntityId(Long id, Long classId);
}