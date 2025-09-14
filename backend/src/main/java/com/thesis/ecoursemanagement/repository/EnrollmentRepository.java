package com.thesis.ecoursemanagement.repository;

import com.thesis.ecoursemanagement.model.ClassEntity;
import com.thesis.ecoursemanagement.model.Course;
import com.thesis.ecoursemanagement.model.Enrollment;
import com.thesis.ecoursemanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudent(User studentId);

    boolean existsByStudentAndClassEntity(User student, ClassEntity classEntity);

    List<Enrollment> findByClassEntityId(Long classId);

    @Query("SELECT SUM(c.cost) " +
            "FROM Enrollment e JOIN e.classEntity c " +
            "WHERE e.status IN ('APPROVED', 'COMPLETED', 'PENDING') AND c.id = :classId")
    Long calculateRevenueByClassId(@Param("classId") Long classId);

    @Query("SELECT SUM(c.cost) " +
            "FROM Enrollment e JOIN e.classEntity c JOIN c.course course " +
            "WHERE e.status IN ('APPROVED', 'COMPLETED', 'PENDING') AND course.id = :courseId")
    Long calculateRevenueByCourseId(@Param("courseId") Long courseId);

    @Query("SELECT c.name, SUM(c.cost) " +
            "FROM Enrollment e JOIN e.classEntity c " +
            "WHERE e.status IN ('APPROVED', 'COMPLETED', 'PENDING') " +
            "GROUP BY c.name")
    List<Object[]> revenueGroupedByClass();

    @Query("SELECT course.courseName, SUM(c.cost) " +
            "FROM Enrollment e JOIN e.classEntity c JOIN c.course course " +
            "WHERE e.status IN ('APPROVED', 'COMPLETED', 'PENDING') " +
            "GROUP BY course.courseName")
    List<Object[]> revenueGroupedByCourse();
}
