package com.thesis.ecoursemanagement.mapper;

import com.thesis.ecoursemanagement.dto.request.ClassRequest;
import com.thesis.ecoursemanagement.dto.response.ClassResponse;
import com.thesis.ecoursemanagement.model.ClassEntity;
import com.thesis.ecoursemanagement.model.Role;
import com.thesis.ecoursemanagement.model.RoleName;
import com.thesis.ecoursemanagement.model.User;
import com.thesis.ecoursemanagement.repository.UserRepository;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClassMapper {
    @Mapping(source = "teacher.id", target = "teacherId")
    ClassResponse toClassResponse(ClassEntity entity);

    @Mapping(target = "teacher", ignore = true)
    ClassEntity toClassEntity(ClassRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "teacher", ignore = true)
    void updateEntityFromRequest(ClassRequest request, @MappingTarget ClassEntity entity);

    List<ClassResponse> toResponseList(List<ClassEntity> entities);
}
