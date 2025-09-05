package com.thesis.ecoursemanagement.repository;

import com.thesis.ecoursemanagement.model.PasswordResetToken;
import com.thesis.ecoursemanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByUser(User user);

    Optional<PasswordResetToken> findByToken(String token);
}