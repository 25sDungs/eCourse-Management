package com.thesis.ecoursemanagement.repository;

import com.thesis.ecoursemanagement.model.ClassEntity;
import com.thesis.ecoursemanagement.model.Enrollment;
import com.thesis.ecoursemanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudent(User studentId);

    boolean existsByStudentAndClassEntity(User student, ClassEntity classEntity);

    List<Enrollment> findByClassEntityId(Long classId);
}
