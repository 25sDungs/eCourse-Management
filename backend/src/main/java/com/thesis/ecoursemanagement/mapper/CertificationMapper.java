package com.thesis.ecoursemanagement.mapper;

import com.thesis.ecoursemanagement.dto.response.CertificationResponse;
import com.thesis.ecoursemanagement.model.Certification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CertificationMapper {
    @Mapping(source = "student.id", target = "studentId")
    @Mapping(source = "classEntity.id", target = "classId")
    CertificationResponse toResponse(Certification entity);

    List<CertificationResponse> toResponseList(List<Certification> entities);
}
