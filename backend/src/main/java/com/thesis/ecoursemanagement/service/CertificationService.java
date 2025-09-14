package com.thesis.ecoursemanagement.service;

import com.thesis.ecoursemanagement.dto.request.CertificationRequest;
import com.thesis.ecoursemanagement.dto.response.CertificationResponse;
import com.thesis.ecoursemanagement.mapper.CertificationMapper;
import com.thesis.ecoursemanagement.model.Certification;
import com.thesis.ecoursemanagement.model.ClassEntity;
import com.thesis.ecoursemanagement.model.User;
import com.thesis.ecoursemanagement.repository.CertificationRepository;
import com.thesis.ecoursemanagement.repository.ClassRepository;
import com.thesis.ecoursemanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CertificationService {
    private final CertificationRepository certificationRepository;
    private final CertificationMapper certificationMapper;
    private final UserRepository userRepository;
    private final ClassRepository classRepository;

    private User getCurrentStudent() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public List<CertificationResponse> getMyCertificates() {
        User student = getCurrentStudent();
        return certificationRepository.findByStudent(student)
                .stream()
                .map(certificationMapper::toResponse)
                .toList();
    }

//    public CertificationResponse createCertification(CertificationRequest request) {
//        User student = getCurrentStudent();
//        ClassEntity classEntity = classRepository.findById(request.getClassId())
//                .orElseThrow(() -> new RuntimeException("Class not found"));
//
//        Certification certification = new Certification();
//        certification.setStudent(student);
//        certification.setClassEntity(classEntity);
//        certification.setContent(request.getContent());
//        certification.setIssueDate(LocalDate.now());
//        certification.setUrl("/certificates/" + UUID.randomUUID() + ".pdf");
//
//        return certificationMapper.toResponse(certificationRepository.save(certification));
//    }
}