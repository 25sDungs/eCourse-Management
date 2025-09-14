package com.thesis.ecoursemanagement.controller;

import com.thesis.ecoursemanagement.dto.request.AIChatRequest;
import com.thesis.ecoursemanagement.service.AIChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AIChatController {
    private final AIChatService chatService;

    @PostMapping("/chat")
    public String chat(@RequestBody AIChatRequest request) {
        return chatService.chat(request);
    }
}
