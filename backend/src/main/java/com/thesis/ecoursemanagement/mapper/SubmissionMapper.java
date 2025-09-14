package com.thesis.ecoursemanagement.mapper;

import com.thesis.ecoursemanagement.dto.request.SubmissionRequest;
import com.thesis.ecoursemanagement.dto.response.SubmissionResponse;
import com.thesis.ecoursemanagement.model.Submission;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SubmissionMapper {
    Submission toEntity(SubmissionRequest request);

    @Mapping(source = "assignment.id", target = "assignmentId")
    @Mapping(source = "student.username", target = "studentUsername")
    SubmissionResponse toResponse(Submission submission);

    List<SubmissionResponse> toResponseList(List<Submission> submissions);
}
