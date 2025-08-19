package com.thesis.ecoursemanagement.repository;

import com.thesis.ecoursemanagement.model.Certification;
import com.thesis.ecoursemanagement.model.ClassEntity;
import com.thesis.ecoursemanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Long> {
    boolean existsByStudentAndClassEntity(User student, ClassEntity classEntity);
    List<Certification> findByStudent(User student);
}
