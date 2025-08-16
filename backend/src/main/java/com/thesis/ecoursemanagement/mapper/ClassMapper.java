package com.thesis.ecoursemanagement.mapper;

import com.thesis.ecoursemanagement.dto.request.ClassRequest;
import com.thesis.ecoursemanagement.dto.response.ClassResponse;
import com.thesis.ecoursemanagement.model.ClassEntity;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClassMapper {
    ClassResponse toClassResponse(ClassEntity entity);

    ClassEntity toClassEntity(ClassRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromRequest(ClassRequest request, @MappingTarget ClassEntity entity);

    List<ClassResponse> toResponseList(List<ClassEntity> entities);
}
