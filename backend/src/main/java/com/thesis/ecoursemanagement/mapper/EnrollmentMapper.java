package com.thesis.ecoursemanagement.mapper;

import com.thesis.ecoursemanagement.dto.response.EnrollmentResponse;
import com.thesis.ecoursemanagement.model.Enrollment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EnrollmentMapper {
    @Mapping(source = "student.id", target = "studentId")
    @Mapping(source = "classEntity.id", target = "classId")
    @Mapping(source = "classEntity.name", target = "className")
    @Mapping(source = "classEntity.course.id", target = "courseId")
    EnrollmentResponse toResponse(Enrollment entity);

    List<EnrollmentResponse> toResponseList(List<Enrollment> entities);
}
