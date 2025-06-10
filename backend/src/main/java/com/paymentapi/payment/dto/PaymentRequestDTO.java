package com.paymentapi.payment.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PaymentRequestDTO {
    @NotBlank
    public String ownerName;

    @NotNull
    public String cardNumber;

    @NotBlank
    public String cvv;

    @NotNull
    public String expirationDate;

    @NotNull
    public String cpf;

    @NotNull
    public LocalDate birthDate;
}
