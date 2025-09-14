package com.thesis.ecoursemanagement.mapper;

import com.thesis.ecoursemanagement.dto.request.CourseRequest;
import com.thesis.ecoursemanagement.dto.response.CourseResponse;
import com.thesis.ecoursemanagement.model.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CourseMapper {
    @Mapping(target = "classes", ignore = true)
    Course toCourse(CourseRequest request);

    CourseResponse toResponse(Course course);

    List<CourseResponse> toResponseList(List<Course> entities);
}
