package com.thesis.ecoursemanagement.repository;

import com.thesis.ecoursemanagement.model.PaymentTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction, Long> {
    PaymentTransaction findByTxnRef(String txnRef);
}
