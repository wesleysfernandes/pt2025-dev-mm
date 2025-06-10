package com.paymentapi.payment.exception;

public class PaymentException extends RuntimeException {
    private final String errorCode;

    public PaymentException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}
