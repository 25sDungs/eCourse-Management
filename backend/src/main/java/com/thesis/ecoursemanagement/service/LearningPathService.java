package com.thesis.ecoursemanagement.service;

import com.thesis.ecoursemanagement.dto.request.LearningPathRequest;
import com.thesis.ecoursemanagement.dto.response.LearningPathResponse;
import com.thesis.ecoursemanagement.mapper.LearningPathMapper;
import com.thesis.ecoursemanagement.model.LearningPath;
import com.thesis.ecoursemanagement.model.User;
import com.thesis.ecoursemanagement.repository.LearningPathRepository;
import com.thesis.ecoursemanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LearningPathService {
    private final LearningPathRepository learningPathRepository;
    private final LearningPathMapper mapper;
    private final UserRepository userRepository;

    private User getCurrentStudent() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public List<LearningPathResponse> getMyLearningPaths() {
        User student = getCurrentStudent();
        return learningPathRepository.findByStudent(student)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    public LearningPathResponse createLearningPath(LearningPathRequest request) {
        User student = getCurrentStudent();
        LearningPath lp = mapper.toEntity(request);
        lp.setStudent(student);
        return mapper.toResponse(learningPathRepository.save(lp));
    }

    public LearningPathResponse updateLearningPath(Long id, LearningPathRequest request) {
        User student = getCurrentStudent();
        LearningPath lp = learningPathRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Learning Path not found"));

        if (!lp.getStudent().getId().equals(student.getId())) {
            throw new RuntimeException("Access denied");
        }

        lp.setTitle(request.getTitle());
        lp.setDescription(request.getDescription());
        lp.setStartDate(request.getStartDate());
        lp.setEndDate(request.getEndDate());

        return mapper.toResponse(learningPathRepository.save(lp));
    }

    public void deleteLearningPath(Long id) {
        learningPathRepository.deleteById(id);
    }
}
