package com.thesis.ecoursemanagement.service;

import com.thesis.ecoursemanagement.dto.request.ClassContentRequest;
import com.thesis.ecoursemanagement.dto.response.ClassContentResponse;
import com.thesis.ecoursemanagement.mapper.ClassContentMapper;
import com.thesis.ecoursemanagement.model.ClassContent;
import com.thesis.ecoursemanagement.model.ClassEntity;
import com.thesis.ecoursemanagement.repository.ClassContentRepository;
import com.thesis.ecoursemanagement.repository.ClassRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClassContentService {

    private final ClassContentRepository classContentRepository;
    private final ClassRepository classRepository;
    private final ClassContentMapper classContentMapper;

    public ClassContentResponse getContentById(Long classId, Long contentId) {
        ClassContent entity = classContentRepository.findById(contentId)
                .orElseThrow(() -> new RuntimeException("Content not found"));

        if (!entity.getClassEntity().getId().equals(classId)) {
            throw new RuntimeException("Content does not belong to this class");
        }

        return classContentMapper.toResponse(entity);
    }

    public List<ClassContentResponse> getContentsByClass(Long classId) {
        return classContentRepository.findByClassEntityId(classId)
                .stream()
                .map(classContentMapper::toResponse)
                .toList();
    }

    public ClassContentResponse createContent(Long classId, ClassContentRequest request) {
        ClassEntity classEntity = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));

        ClassContent entity = classContentMapper.toEntity(request);
        entity.setClassEntity(classEntity);

        return classContentMapper.toResponse(classContentRepository.save(entity));
    }

    public ClassContentResponse updateContent(Long classId, Long contentId, ClassContentRequest request) {

        ClassContent entity = classContentRepository.findById(contentId)
                .orElseThrow(() -> new RuntimeException("Content not found"));

        if (!entity.getClassEntity().getId().equals(classId)) {
            throw new RuntimeException("Content does not belong to this class");
        }

        if (request.getTitle() != null) entity.setTitle(request.getTitle());
        if (request.getContent() != null) entity.setContent(request.getContent());

        return classContentMapper.toResponse(classContentRepository.save(entity));
    }

    public void deleteContent(Long classId, Long contentId) {
        classContentRepository.findByIdAndClassEntityId(contentId, classId)
                .ifPresent(classContentRepository::delete);
    }
}