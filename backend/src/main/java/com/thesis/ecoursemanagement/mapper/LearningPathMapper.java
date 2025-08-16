package com.thesis.ecoursemanagement.mapper;

import com.thesis.ecoursemanagement.dto.request.LearningPathRequest;
import com.thesis.ecoursemanagement.dto.response.LearningPathResponse;
import com.thesis.ecoursemanagement.model.LearningPath;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LearningPathMapper {
    @Mapping(target = "student", ignore = true)
        // set trong service
    LearningPath toEntity(LearningPathRequest request);

    @Mapping(source = "student.username", target = "studentUsername")
    LearningPathResponse toResponse(LearningPath entity);
}
