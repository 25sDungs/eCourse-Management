package com.thesis.ecoursemanagement.repository;

import com.thesis.ecoursemanagement.model.LearningPath;
import com.thesis.ecoursemanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LearningPathRepository extends JpaRepository<LearningPath, Long> {

    List<LearningPath> findByStudent(User studentId);
}