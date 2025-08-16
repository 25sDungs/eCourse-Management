package com.thesis.ecoursemanagement.service;

import com.thesis.ecoursemanagement.dto.request.CourseRequest;
import com.thesis.ecoursemanagement.dto.response.CourseResponse;
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

    public List<CourseResponse> getAllCourses() {
        return courseMapper.toResponseList(courseRepository.findAll());
    }

    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        return courseMapper.toResponse(course);
    }

    public CourseResponse createCourse(CourseRequest request) {
        Course course = courseMapper.toCourse(request);
        return courseMapper.toResponse(courseRepository.save(course));
    }

    public CourseResponse updateCourse(Long id, CourseRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.setCourseName(request.getCourseName());
        return courseMapper.toResponse(courseRepository.save(course));
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}
