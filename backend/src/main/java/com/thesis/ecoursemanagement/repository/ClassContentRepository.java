package com.thesis.ecoursemanagement.repository;

import com.thesis.ecoursemanagement.model.ClassContent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClassContentRepository extends JpaRepository<ClassContent, Long> {
    List<ClassContent> findByClassEntityId(Long classId);
    Optional<ClassContent> findByIdAndClassEntityId(Long contentId, Long classId);

}
