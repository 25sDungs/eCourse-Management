package com.thesis.ecoursemanagement.service;

import com.thesis.ecoursemanagement.dto.request.EnrollmentRequest;
import com.thesis.ecoursemanagement.dto.response.EnrollmentResponse;
import com.thesis.ecoursemanagement.mapper.EnrollmentMapper;
import com.thesis.ecoursemanagement.model.Certification;
import com.thesis.ecoursemanagement.model.ClassEntity;
import com.thesis.ecoursemanagement.model.Enrollment;
import com.thesis.ecoursemanagement.model.User;
import com.thesis.ecoursemanagement.repository.CertificationRepository;
import com.thesis.ecoursemanagement.repository.ClassRepository;
import com.thesis.ecoursemanagement.repository.EnrollmentRepository;
import com.thesis.ecoursemanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final ClassRepository classRepository;
    private final EnrollmentMapper enrollmentMapper;
    private final CertificationRepository certificationRepository;


    private User getCurrentStudent() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public EnrollmentResponse enroll(EnrollmentRequest request) {
        User student = getCurrentStudent();

        ClassEntity classEntity = classRepository.findById(request.getClassId())
                .orElseThrow(() -> new RuntimeException("Class not found"));
        boolean exists = enrollmentRepository.existsByStudentAndClassEntity(student, classEntity);
        if (exists) {
            throw new RuntimeException("You are already enrolled in this class");
        }

        Enrollment enrollment = Enrollment.builder()
                .student(student)
                .classEntity(classEntity)
                .enrollTime(LocalDate.now())
                .status(request.getStatus() != null ? request.getStatus() : "PENDING")
                .build();

        return enrollmentMapper.toResponse(enrollmentRepository.save(enrollment));
    }

    public List<EnrollmentResponse> getMyEnrollments() {
        User student = getCurrentStudent();
        return enrollmentRepository.findByStudent(student)
                .stream()
                .map(enrollmentMapper::toResponse)
                .toList();
    }

    public List<EnrollmentResponse> getAllEnrollments() {
        return enrollmentRepository.findAll()
                .stream()
                .map(enrollmentMapper::toResponse) // chuyển entity -> DTO
                .toList();
    }

    public EnrollmentResponse updateStatus(Long enrollmentId, String status) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        enrollment.setStatus(status);

        if ("COMPLETED".equalsIgnoreCase(status)) {
            boolean exists = certificationRepository.existsByStudentAndClassEntity(
                    enrollment.getStudent(), enrollment.getClassEntity()
            );
            if (!exists) {
                Certification cert = Certification.builder()
                        .student(enrollment.getStudent())
                        .classEntity(enrollment.getClassEntity())
                        .content("Chứng chỉ hoàn thành lớp " + enrollment.getClassEntity().getName())
                        .issueDate(LocalDate.now())
                        .url("/certificates/" + enrollment.getStudent().getId()
                                + "_" + enrollment.getClassEntity().getId() + ".pdf")
                        .build();
                certificationRepository.save(cert);
            }
        }
        return enrollmentMapper.toResponse(enrollmentRepository.save(enrollment));
    }

    public Long getRevenueByClassId(Long classId) {
        return Optional.ofNullable(enrollmentRepository.calculateRevenueByClassId(classId)).orElse(0L);
    }

    public Long getRevenueByCourseId(Long courseId) {
        return Optional.ofNullable(enrollmentRepository.calculateRevenueByCourseId(courseId)).orElse(0L);
    }

    public Map<String, Long> getRevenueGroupedByClass() {
        return enrollmentRepository.revenueGroupedByClass().stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0],
                        row -> (Long) row[1]
                ));
    }

    public Map<String, Long> getRevenueGroupedByCourse() {
        return enrollmentRepository.revenueGroupedByCourse().stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0],
                        row -> (Long) row[1]
                ));
    }
}
