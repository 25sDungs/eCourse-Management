package com.thesis.ecoursemanagement.service;

import com.thesis.ecoursemanagement.dto.request.CourseRequest;
import com.thesis.ecoursemanagement.dto.response.ClassResponse;
import com.thesis.ecoursemanagement.dto.response.CourseResponse;
import com.thesis.ecoursemanagement.mapper.ClassMapper;
import com.thesis.ecoursemanagement.mapper.CourseMapper;
import com.thesis.ecoursemanagement.model.Course;
import com.thesis.ecoursemanagement.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseMapper courseMapper;
    private final CourseRepository courseRepository;
    private final ClassMapper classMapper;

    public List<CourseResponse> getAllCourses() {
        return courseMapper.toResponseList(courseRepository.findAll());
    }

    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        List<ClassResponse> classResponses = classMapper.toResponseList(course.getClasses());

        return CourseResponse.builder()
                .id(course.getId())
                .courseName(course.getCourseName())
                .description(course.getDescription())
                .classes(classResponses)
                .build();
    }

    public CourseResponse createCourse(CourseRequest request) {
        Course course = courseMapper.toCourse(request);
        return courseMapper.toResponse(courseRepository.save(course));
    }

    public CourseResponse updateCourse(Long id, CourseRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        if (request.getCourseName() != null) course.setCourseName(request.getCourseName());
        if (request.getDescription() != null) course.setDescription(request.getDescription());
        return courseMapper.toResponse(courseRepository.save(course));
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}
