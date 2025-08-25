package com.thesis.ecoursemanagement.dto.request;

import lombok.Data;

@Data
public class PaymentRequest {
    private Long courseClassId;
    private Long amount;
    private String returnUrl;
}
