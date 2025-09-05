package com.thesis.ecoursemanagement.service;

import com.thesis.ecoursemanagement.dto.request.AIChatRequest;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;
import org.springframework.ai.chat.client.ChatClient;

@Service
public class AIChatService {
    private final ChatClient chatClient;

    public AIChatService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String chat(AIChatRequest request) {
        SystemMessage systemMessage = new SystemMessage("""
                Bạn là trợ lý giúp học viên giải đáp các thắc mắc vấn đề về hệ thống khóa học eCourse.
                Trả lời đúng trọng tâm câu hỏi.
                Trả lời trong câu hỏi trong khoảng 50-100 từ.
                """);
        UserMessage userMessage = new UserMessage(request.message());
        Prompt prompt = new Prompt(systemMessage, userMessage);

        return chatClient.prompt(prompt).call().content();
    }
}
