package com.thesis.ecoursemanagement.service;

import com.thesis.ecoursemanagement.dto.request.ClassCreateRequest;
import com.thesis.ecoursemanagement.dto.response.ClassResponse;
import com.thesis.ecoursemanagement.mapper.ClassMapper;
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
    private final ClassMapper classMapper;

    //    public Page<ClassEntity> getAllClasses(int page, int size) {
//        return classRepository.findAll(PageRequest.of(page, size));
//    }

    public Page<ClassResponse> getAllClasses(int page, int size) {
        return classRepository.findAll(PageRequest.of(page, size))
                .map(classMapper::toClassResponse);
    }


    public Optional<ClassResponse> getClassById(Long id) {
        return classRepository.findById(id)
                .map(classMapper::toClassResponse);
    }

    public ClassEntity createClass(ClassEntity classEntity) {
        return classRepository.save(classEntity);
    }

    public ClassResponse updateClass(Long id, ClassCreateRequest request) {
        ClassEntity entity = classRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Class not found"));

        classMapper.updateEntityFromRequest(request, entity);

        ClassEntity updated = classRepository.save(entity);

        return classMapper.toClassResponse(updated);
    }

    public String deleteClass(Long id) {
        classRepository.deleteById(id);
        return "Class deleted!";
    }
}