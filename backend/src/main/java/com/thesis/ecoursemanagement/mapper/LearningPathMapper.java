package com.thesis.ecoursemanagement.mapper;

import com.thesis.ecoursemanagement.dto.LearningPathDTO;
import com.thesis.ecoursemanagement.model.LearningPath;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LearningPathMapper {
//    @Mapping(target = "userId", source = "user.id")
    LearningPathDTO toDTO(LearningPath learningPath);

    @Mapping(target = "student", ignore = true)
    LearningPath toEntity(LearningPathDTO learningPathDTO);
}
