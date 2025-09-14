package com.thesis.ecoursemanagement.service;

import com.thesis.ecoursemanagement.model.PasswordResetToken;
import com.thesis.ecoursemanagement.model.User;
import com.thesis.ecoursemanagement.repository.PasswordResetTokenRepository;
import com.thesis.ecoursemanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetService {
    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final JavaMailSender mailSender;
    private final BCryptPasswordEncoder passwordEncoder;

    public void createPasswordResetToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));

        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken = tokenRepository.findByUser(user)
                .orElse(new PasswordResetToken());

        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(15));

        tokenRepository.save(resetToken);

        String resetUrl = "http://localhost:5173/reset-password?token=" + token;

        sendEmail(user.getEmail(), resetUrl);
    }

    private void sendEmail(String to, String resetUrl) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Đặt lại mật khẩu");
        message.setText("Nhấn vào link sau để đặt lại mật khẩu: " + resetUrl);
        mailSender.send(message);
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token không hợp lệ"));

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token đã hết hạn");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        tokenRepository.delete(resetToken);
    }
}