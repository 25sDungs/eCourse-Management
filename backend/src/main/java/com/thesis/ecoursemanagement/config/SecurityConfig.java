package com.thesis.ecoursemanagement.config;

import com.thesis.ecoursemanagement.repository.UserRepository;
import com.thesis.ecoursemanagement.security.OAuth2LoginSuccessHandler;
import com.thesis.ecoursemanagement.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.stream.Collectors;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final OAuth2LoginSuccessHandler successHandler;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/login", "/oauth2/**", "/api/auth/forgot-password", "/api/auth/reset-password",
                                "/api/payments", "/api/chat", "/api/payments/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/users").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/users/me").hasAnyAuthority("ROLE_ADMIN", "ROLE_STUDENT", "ROLE_TEACHER")
                        .requestMatchers(HttpMethod.PATCH, "/api/users/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_STUDENT", "ROLE_TEACHER")
                        .requestMatchers("/api/users/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers("/api/learning-paths", "/api/learning-paths/**").hasAuthority("ROLE_STUDENT")
                        .requestMatchers("/api/courses/*/classes/*/assignments/*/submissions", "/api/courses/*/classes/*/assignments/*/submissions/**")
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_TEACHER", "ROLE_STUDENT")
                        .requestMatchers(HttpMethod.GET, "/api/courses/*/classes/*/contents", "/api/courses/*/classes/*/contents/**",
                                "/api/courses/*/classes/*/assignments", "/api/courses/*/classes/*/assignments/**")
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_TEACHER", "ROLE_STUDENT")
                        .requestMatchers("/api/courses/*/classes/*/contents", "/api/courses/*/classes/*/contents/**",
                                "/api/courses/*/classes/*/assignments", "/api/courses/*/classes/*/assignments/**")
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_TEACHER")
                        .requestMatchers(HttpMethod.GET, "/api/courses/*/classes/teacher/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_TEACHER")
                        .requestMatchers(HttpMethod.GET, "/api/courses/*/classes/**").hasAnyAuthority("ROLE_STUDENT", "ROLE_ADMIN", "ROLE_TEACHER")
                        .requestMatchers(HttpMethod.POST, "/api/courses/*/classes", "/api/courses/*/classes/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/courses/*/classes", "/api/courses/*/classes/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/courses/*/classes", "/api/courses/*/classes/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/courses/*/classes", "/api/courses/*/classes/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers("/api/courses/*/classes/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_TEACHER")
                        .requestMatchers(HttpMethod.GET, "/api/courses", "/api/courses/**", "/api/courses/*/classes", "/api/courses/*/classes/**").permitAll()
                        .requestMatchers("/api/courses", "/api/courses/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers("/api/enrollments", "/api/enrollments/me").hasAnyAuthority("ROLE_ADMIN", "ROLE_STUDENT")
                        .requestMatchers(HttpMethod.PATCH, "/api/enrollments/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/certifications/me", "/api/certifications/*/download").hasAuthority("ROLE_STUDENT")
                        .requestMatchers("/api/certifications/**").hasAuthority("ROLE_ADMIN")
                        .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .oauth2Login(oauth2 -> oauth2.successHandler(successHandler));
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public UserDetailsService userDetailsService(UserRepository userRepository) {
        return username -> userRepository.findByUsername(username)
                .map(user -> org.springframework.security.core.userdetails.User
                        .withUsername(user.getUsername())
                        .password(user.getPassword())
                        .authorities(user.getRoles().stream()
                                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                                .collect(Collectors.toList()))
                        .build())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}