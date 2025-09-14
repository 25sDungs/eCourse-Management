package com.thesis.ecoursemanagement.mapper;

import com.thesis.ecoursemanagement.dto.request.ClassContentRequest;
import com.thesis.ecoursemanagement.dto.response.ClassContentResponse;
import com.thesis.ecoursemanagement.model.ClassContent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ClassContentMapper {

    @Mapping(source = "classEntity.id", target = "classId")
    ClassContentResponse toResponse(ClassContent entity);

    ClassContent toEntity(ClassContentRequest request);
}
