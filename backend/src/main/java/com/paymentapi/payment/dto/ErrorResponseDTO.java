package com.paymentapi.payment.dto;

public class ErrorResponseDTO {
    private final int status;
    private final String message;
    private final String error;

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public String getError() {
        return error;
    }

    public ErrorResponseDTO(int status, String message, String error) {
        this.status = status;
        this.message = message;
        this.error = error;
    }

}
