package com.thesis.ecoursemanagement.service;

import com.thesis.ecoursemanagement.model.ClassEntity;
import com.thesis.ecoursemanagement.repository.ClassRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClassService {

    private final ClassRepository classRepository;

    public Page<ClassEntity> getAllClasses(int page, int size) {
        return classRepository.findAll(PageRequest.of(page, size));
    }

    public Optional<ClassEntity> getClassById(Long id) {
        return classRepository.findById(id);
    }

    public ClassEntity createClass(ClassEntity classEntity) {
        return classRepository.save(classEntity);
    }

    public ClassEntity updateClass(Long id, ClassEntity classEntity) {
        return classRepository.findById(id)
                .map(existing -> {
                    existing.setName(classEntity.getName());
                    existing.setDescription(classEntity.getDescription());
                    existing.setStartDate(classEntity.getStartDate());
                    existing.setEndDate(classEntity.getEndDate());
                    existing.setTeacherName(classEntity.getTeacherName());
                    return classRepository.save(existing);
                }).orElseThrow(() -> new RuntimeException("Class not found"));
    }

    public void deleteClass(Long id) {
        classRepository.deleteById(id);
    }
}