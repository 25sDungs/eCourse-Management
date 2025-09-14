package com.thesis.ecoursemanagement.controller;

import com.thesis.ecoursemanagement.dto.request.PaymentRequest;
import com.thesis.ecoursemanagement.dto.response.PaymentResponse;
import com.thesis.ecoursemanagement.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService vnPayService;

    @PostMapping("/create")
    public PaymentResponse createPayment(@RequestBody PaymentRequest request) {
        String paymentUrl = vnPayService.createPaymentUrl(request.getAmount(), request.getReturnUrl(), request.getCourseClassId());
        PaymentResponse response = new PaymentResponse();
        response.setPaymentUrl(paymentUrl);
        return response;
    }
}
