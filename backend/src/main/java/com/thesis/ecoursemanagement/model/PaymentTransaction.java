package com.thesis.ecoursemanagement.model;
import lombok.Data;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.util.Date;

@Entity
@Data
public class PaymentTransaction {
    @Id @GeneratedValue
    private Long id;
    private String txnRef;
    private String userId;
    private Long courseClassId;
    private Long amount;
    private String status;
    private Date createDate = new Date();
    private Date updateDate;
}
