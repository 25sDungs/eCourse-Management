package com.thesis.ecoursemanagement.service;

import com.thesis.ecoursemanagement.dto.request.ClassRequest;
import com.thesis.ecoursemanagement.dto.response.ClassResponse;
import com.thesis.ecoursemanagement.mapper.ClassMapper;
import com.thesis.ecoursemanagement.model.ClassEntity;
import com.thesis.ecoursemanagement.model.Course;
import com.thesis.ecoursemanagement.repository.ClassRepository;
import com.thesis.ecoursemanagement.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClassService {

    private final ClassRepository classRepository;
    private final ClassMapper classMapper;
    private final CourseRepository courseRepository;

    //    public Page<ClassEntity> getAllClasses(int page, int size) {
//        return classRepository.findAll(PageRequest.of(page, size));
//    }

    public List<ClassResponse> getAllClassesByCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        return classMapper.toResponseList(course.getClasses());
    }


    public ClassResponse getClassById(Long courseId, Long classId) {
        ClassEntity classEntity = classRepository.findByIdAndCourseId(classId, courseId)
                .orElseThrow(() -> new RuntimeException("Class not found in this course"));
        return classMapper.toClassResponse(classEntity);
    }

    public List<ClassResponse> getClassesByCourse(Long courseId) {
        return classMapper.toResponseList(classRepository.findByCourseId(courseId));
    }

    public ClassResponse createClass(Long courseId, ClassRequest request) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        ClassEntity entity = classMapper.toClassEntity(request);
        entity.setCourse(course);

        return classMapper.toClassResponse(classRepository.save(entity));
    }

    public ClassResponse updateClass(Long courseId, Long classId, ClassRequest request) {
        ClassEntity entity = classRepository.findByIdAndCourseId(classId, courseId)
                .orElseThrow(() -> new RuntimeException("Class not found in this course"));

        classMapper.updateEntityFromRequest(request, entity);

        return classMapper.toClassResponse(classRepository.save(entity));
    }

    public void deleteClass(Long courseId, Long classId) {
        classRepository.findByIdAndCourseId(classId, courseId).ifPresent(classRepository::delete);
    }
}