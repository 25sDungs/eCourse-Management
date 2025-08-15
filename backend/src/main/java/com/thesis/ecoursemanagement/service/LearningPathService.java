package com.thesis.ecoursemanagement.service;

import com.thesis.ecoursemanagement.dto.LearningPathDTO;
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
import java.util.stream.Collectors;

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

    public List<LearningPathDTO> getMyLearningPaths() {
        User student = getCurrentStudent();
        return learningPathRepository.findByStudent(student)
                .stream().map(mapper::toDTO).toList();
    }

    public LearningPathDTO createLearningPath(LearningPathDTO dto) {
        User student = getCurrentStudent();
        LearningPath lp = mapper.toEntity(dto);
        lp.setStudent(student);
        return mapper.toDTO(learningPathRepository.save(lp));
    }

    public LearningPathDTO updateLearningPath(Long id, LearningPathDTO dto) {
        User student = getCurrentStudent();
        LearningPath lp = learningPathRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Learning Path not found"));

        if (!lp.getStudent().getId().equals(student.getId())) {
            throw new RuntimeException("Access denied");
        }

        lp.setTitle(dto.getTitle());
        lp.setDescription(dto.getDescription());
        lp.setStartDate(dto.getStartDate());
        lp.setEndDate(dto.getEndDate());

        return mapper.toDTO(learningPathRepository.save(lp));
    }

    public void deleteLearningPath(Long id) {
        learningPathRepository.deleteById(id);
    }
}
