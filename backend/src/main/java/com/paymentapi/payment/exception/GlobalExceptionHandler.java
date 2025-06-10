package com.paymentapi.payment.exception;

import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.paymentapi.payment.dto.ErrorResponseDTO;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDTO> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage()).collect(Collectors.joining(", "));

        return ResponseEntity.badRequest().body(
                new ErrorResponseDTO(
                        HttpStatus.BAD_REQUEST.value(),
                        "Erro de validação",
                        errorMessage));
    }
    @ExceptionHandler(PaymentException.class)
    public ResponseEntity<ErrorResponseDTO> handlePaymentException(PaymentException ex) {
        return ResponseEntity.badRequest().body(
                new ErrorResponseDTO(
                        HttpStatus.BAD_REQUEST.value(),
                        ex.getErrorCode(),
                        ex.getMessage()
                )
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleGeneralExceptions(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ErrorResponseDTO(
                        HttpStatus.INTERNAL_SERVER_ERROR.value(),
                        "Erro interno",
                        ex.getMessage()
                )
        );
    }
}
