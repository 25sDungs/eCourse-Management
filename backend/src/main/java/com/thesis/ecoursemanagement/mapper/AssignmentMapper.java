package com.thesis.ecoursemanagement.mapper;

import com.thesis.ecoursemanagement.dto.request.AssignmentRequest;
import com.thesis.ecoursemanagement.dto.response.AssignmentResponse;
import com.thesis.ecoursemanagement.model.Assignment;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface AssignmentMapper {

    Assignment toEntity(AssignmentRequest request);

    @Mapping(source = "classEntity.id", target = "classId")
    AssignmentResponse toResponse(Assignment assignment);
}
