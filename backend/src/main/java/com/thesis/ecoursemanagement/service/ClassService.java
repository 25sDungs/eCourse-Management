package com.thesis.ecoursemanagement.service;

import com.thesis.ecoursemanagement.dto.request.ClassRequest;
import com.thesis.ecoursemanagement.dto.response.ClassResponse;
import com.thesis.ecoursemanagement.mapper.ClassMapper;
import com.thesis.ecoursemanagement.model.*;
import com.thesis.ecoursemanagement.repository.ClassRepository;
import com.thesis.ecoursemanagement.repository.CourseRepository;
import com.thesis.ecoursemanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClassService {

    private final ClassRepository classRepository;
    private final ClassMapper classMapper;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

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

    public ClassResponse createClass(Long courseId, ClassRequest request) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        ClassEntity classEntity = classMapper.toClassEntity(request);
        classEntity.setCourse(course);
        if (request.getTeacherId() != null) {
            User teacher = userRepository.findById(request.getTeacherId())
                    .orElseThrow(() -> new RuntimeException("Teacher not found"));
            boolean isTeacher = teacher.getRoles().stream()
                    .anyMatch(r -> r.getName() == RoleName.ROLE_TEACHER);
            if (!isTeacher) {
                throw new RuntimeException("User is not a teacher");
            }
            classEntity.setTeacher(teacher);
        } else {
            classEntity.setTeacher(null);
        }

        return classMapper.toClassResponse(classRepository.save(classEntity));
    }

    public ClassResponse updateClass(Long courseId, Long classId, ClassRequest request) {
        ClassEntity classEntity = classRepository.findByIdAndCourseId(classId, courseId)
                .orElseThrow(() -> new RuntimeException("Class not found in this course"));

        classMapper.updateEntityFromRequest(request, classEntity);
        if (request.getTeacherId() != null) {
            User teacher = userRepository.findById(request.getTeacherId())
                    .orElseThrow(() -> new RuntimeException("Teacher not found"));
            boolean isTeacher = teacher.getRoles().stream()
                    .anyMatch(r -> r.getName() == RoleName.ROLE_TEACHER);
            if (!isTeacher) {
                throw new RuntimeException("User is not a teacher");
            }
            classEntity.setTeacher(teacher);
        } else {
            classEntity.setTeacher(null);
        }
        return classMapper.toClassResponse(classRepository.save(classEntity));
    }

    public ClassResponse updateClassTeacher(Long classId, String teacherIdStr) {
        ClassEntity entity = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));

        if (teacherIdStr == null) {
            return classMapper.toClassResponse(entity);
        }

        if (teacherIdStr.isBlank()) {
            entity.setTeacher(null);
        } else {
            User teacher = userRepository.findById(teacherIdStr)
                    .orElseThrow(() -> new RuntimeException("Teacher not found"));

            boolean isTeacher = teacher.getRoles().stream()
                    .map(Role::getName)
                    .anyMatch(roleName -> roleName == RoleName.ROLE_TEACHER);

            if (!isTeacher) {
                throw new RuntimeException("User is not a teacher");
            }
            entity.setTeacher(teacher);
        }

        return classMapper.toClassResponse(classRepository.save(entity));
    }

    public void deleteClass(Long courseId, Long classId) {
        classRepository.findByIdAndCourseId(classId, courseId).ifPresent(classRepository::delete);
    }

    public List<ClassResponse> getClassesByTeacher(String teacherId) {
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        boolean isTeacher = teacher.getRoles().stream()
                .anyMatch(r -> r.getName() == RoleName.ROLE_TEACHER);
        if (!isTeacher) {
            throw new RuntimeException("User is not a teacher");
        }

        List<ClassEntity> classes = classRepository.findByTeacherId(teacherId);
        return classMapper.toResponseList(classes);
    }
}