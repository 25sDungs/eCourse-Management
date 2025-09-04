package com.thesis.ecoursemanagement.security;

import com.thesis.ecoursemanagement.model.Role;
import com.thesis.ecoursemanagement.model.RoleName;
import com.thesis.ecoursemanagement.model.User;
import com.thesis.ecoursemanagement.repository.RoleRepository;
import com.thesis.ecoursemanagement.repository.UserRepository;
import com.thesis.ecoursemanagement.service.JWTService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JWTService jwtService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        DefaultOAuth2User oAuth2User = (DefaultOAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setUsername(email); // hoặc generate username khác
                    newUser.setFirstName(oAuth2User.getAttribute("given_name"));
                    newUser.setLastName(oAuth2User.getAttribute("family_name"));
                    newUser.setAvatarUrl(oAuth2User.getAttribute("picture"));
                    return userRepository.save(newUser);
                });
        Role defaultRole = roleRepository.findByName(RoleName.ROLE_STUDENT)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        user.getRoles().add(defaultRole);

        String token = jwtService.generateToken(user);
//        Cookie tokenCookie = new Cookie("jwtToken", token);
//        tokenCookie.setHttpOnly(true);
//        tokenCookie.setSecure(false); //https -> true
//        tokenCookie.setPath("/");
//        tokenCookie.setMaxAge(60 * 60); // 1 giờ
//        response.addCookie(tokenCookie);
        response.sendRedirect("http://localhost:5173/oauth2/redirect?token=" + token + "&name=" + user.getUsername());
    }
}
