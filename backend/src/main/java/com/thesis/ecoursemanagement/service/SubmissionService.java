package com.thesis.ecoursemanagement.service;

import com.thesis.ecoursemanagement.dto.request.SubmissionRequest;
import com.thesis.ecoursemanagement.dto.request.SubmitScoreRequest;
import com.thesis.ecoursemanagement.dto.response.SubmissionResponse;
import com.thesis.ecoursemanagement.mapper.SubmissionMapper;
import com.thesis.ecoursemanagement.model.Assignment;
import com.thesis.ecoursemanagement.model.Submission;
import com.thesis.ecoursemanagement.model.User;
import com.thesis.ecoursemanagement.repository.AssignmentRepository;
import com.thesis.ecoursemanagement.repository.SubmissionRepository;
import com.thesis.ecoursemanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubmissionService {
    private final SubmissionRepository submissionRepository;
    private final AssignmentRepository assignmentTopicRepository;
    private final UserRepository userRepository;
    private final SubmissionMapper submissionMapper;

    private User getCurrentStudent() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public List<SubmissionResponse> getSubmissionsByAssignment(Long assignmentId) {
        return submissionRepository.findByAssignmentId(assignmentId)
                .stream()
                .map(submissionMapper::toResponse)
                .toList();
    }

    public SubmissionResponse getMySubmission(Long assignmentId) {
        User student = getCurrentStudent();
        return submissionRepository.findByAssignmentIdAndStudentId(assignmentId, student.getId())
                .map(submissionMapper::toResponse)
                .orElse(null);
    }

    public SubmissionResponse submitAssignment(Long assignmentId, MultipartFile file) throws IOException {
        User student = getCurrentStudent();
        Assignment assignment = assignmentTopicRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment topic not found"));

        Submission submission = Submission.builder()
                .fileName(file.getOriginalFilename())
                .fileData(file.getBytes())
                .submitTime(LocalDateTime.now())
                .student(student)
                .assignment(assignment)
                .build();

        return submissionMapper.toResponse(submissionRepository.save(submission));
    }

    public SubmissionResponse scoreSubmit(Long id, SubmitScoreRequest request) {
        Submission submission = submissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission not found"));

        submission.setScore(request.getScore());
        submission.setJudge(request.getJudge());

        return submissionMapper.toResponse(submissionRepository.save(submission));
    }

    public byte[] downloadFile(Long submissionId) {
        return submissionRepository.findById(submissionId)
                .orElseThrow(() -> new RuntimeException("Submission not found"))
                .getFileData();
    }

    public String getFileName(Long submissionId) {
        return submissionRepository.findById(submissionId)
                .orElseThrow(() -> new RuntimeException("Submission not found"))
                .getFileName();
    }
}
