package com.thesis.ecoursemanagement.mapper;

import com.thesis.ecoursemanagement.dto.request.ClassCreateRequest;
import com.thesis.ecoursemanagement.dto.response.ClassResponse;
import com.thesis.ecoursemanagement.model.ClassEntity;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ClassMapper {
    ClassResponse toClassResponse(ClassEntity entity);

    ClassEntity toClassEntity(ClassCreateRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromRequest(ClassCreateRequest request, @MappingTarget ClassEntity entity);

//     Lấy username từ teacher name
//    @Mapping(source = "teacher.name", target = "teacherName")
//    ClassResponse toClassResponse(ClassEntity entity);
}
