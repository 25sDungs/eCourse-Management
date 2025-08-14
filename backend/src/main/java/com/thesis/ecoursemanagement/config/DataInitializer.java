package com.thesis.ecoursemanagement.config;

import com.thesis.ecoursemanagement.model.Role;
import com.thesis.ecoursemanagement.model.RoleName;
import com.thesis.ecoursemanagement.model.User;
import com.thesis.ecoursemanagement.repository.RoleRepository;
import com.thesis.ecoursemanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public void run(String... args) {
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role(RoleName.ROLE_STUDENT));
            roleRepository.save(new Role(RoleName.ROLE_TEACHER));
            roleRepository.save(new Role(RoleName.ROLE_ADMIN));
        }
        if (!userRepository.existsByUsername("admin")) { //tạo user admin khi lần đầu chạy
            Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Admin role not found"));

            User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("123456"))
                    .firstName("System")
                    .lastName("admin")
                    .dob(LocalDate.of(1990, 11, 11))
                    .roles(Set.of(adminRole))
                    .build();

            userRepository.save(admin);
        }
    }
}
