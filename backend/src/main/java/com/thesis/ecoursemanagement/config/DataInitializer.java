package com.thesis.ecoursemanagement.config;

import com.thesis.ecoursemanagement.model.Role;
import com.thesis.ecoursemanagement.model.RoleName;
import com.thesis.ecoursemanagement.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) {
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role(RoleName.ROLE_STUDENT));
            roleRepository.save(new Role(RoleName.ROLE_TEACHER));
            roleRepository.save(new Role(RoleName.ROLE_ADMIN));
        }
    }
}
