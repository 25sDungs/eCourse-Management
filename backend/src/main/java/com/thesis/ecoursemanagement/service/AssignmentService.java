package com.thesis.ecoursemanagement.service;

import com.thesis.ecoursemanagement.dto.request.AssignmentRequest;
import com.thesis.ecoursemanagement.dto.response.AssignmentResponse;
import com.thesis.ecoursemanagement.mapper.AssignmentMapper;
import com.thesis.ecoursemanagement.model.Assignment;
import com.thesis.ecoursemanagement.model.ClassEntity;
import com.thesis.ecoursemanagement.repository.AssignmentRepository;
import com.thesis.ecoursemanagement.repository.ClassRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;
    private final ClassRepository classRepository;
    private final AssignmentMapper assignmentMapper;

    public List<AssignmentResponse> getAllAssignments(Long courseId, Long classId) {
        return assignmentRepository.findByClassEntityIdAndClassEntityCourseId(classId, courseId)
                .stream()
                .map(assignmentMapper::toResponse)
                .toList();
    }

    public AssignmentResponse getAssignmentById(Long courseId, Long classId, Long assignmentId) {
        Assignment assignment = assignmentRepository.findByIdAndClassEntityIdAndClassEntityCourseId(assignmentId, classId, courseId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));
        return assignmentMapper.toResponse(assignment);
    }

    public AssignmentResponse createAssignment(Long courseId, Long classId, AssignmentRequest request) {
        ClassEntity classEntity = classRepository.findByIdAndCourseId(classId, courseId)
                .orElseThrow(() -> new RuntimeException("Class not found"));

        Assignment assignment = assignmentMapper.toEntity(request);
        assignment.setClassEntity(classEntity);
        return assignmentMapper.toResponse(assignmentRepository.save(assignment));
    }

    public AssignmentResponse updateAssignment(Long courseId, Long classId, Long assignmentId, AssignmentRequest request) {
        Assignment assignment = assignmentRepository.findByIdAndClassEntityIdAndClassEntityCourseId(assignmentId, classId, courseId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        if(request.getTitle()!=null) assignment.setTitle(request.getTitle());
        if(request.getDescription()!=null) assignment.setDescription(request.getDescription());
        if(request.getDueDate()!=null) assignment.setDueDate(request.getDueDate());
        if(request.getStartDate()!=null) assignment.setStartDate(request.getStartDate());

        return assignmentMapper.toResponse(assignmentRepository.save(assignment));
    }

    public void deleteAssignment(Long courseId, Long classId, Long assignmentId) {
        assignmentRepository.findByIdAndClassEntityIdAndClassEntityCourseId(assignmentId, classId, courseId)
                .ifPresent(assignmentRepository::delete);
    }
}
