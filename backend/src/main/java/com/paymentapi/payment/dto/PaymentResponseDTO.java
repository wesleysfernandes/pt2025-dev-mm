package com.paymentapi.payment.dto;

public record PaymentResponseDTO(
        String status,
        String message,
        String brand) {

}
