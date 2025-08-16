package com.thesis.ecoursemanagement.repository;


import com.thesis.ecoursemanagement.model.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassRepository extends JpaRepository<ClassEntity, Long> {
    List<ClassEntity> findByCourseId(Long courseId);

    Optional<ClassEntity> findByIdAndCourseId(Long id, Long courseId);
}
