package com.paymentapi.payment.service;

import java.time.LocalDate;
import java.time.Period;

import org.springframework.stereotype.Service;

import com.paymentapi.payment.dto.PaymentRequestDTO;
import com.paymentapi.payment.dto.PaymentResponseDTO;
import com.paymentapi.payment.exception.PaymentException;
import com.paymentapi.payment.validator.CPFValidator;
import com.paymentapi.payment.validator.CardBrandValidator;

@Service
public class PaymentService {

    public PaymentResponseDTO dataPayment(PaymentRequestDTO request) {
        String noMaskCPF = request.cpf.replaceAll("[^0-9]", "");
        String noMaskCard = request.cardNumber.replaceAll("[^0-9]", "");

        if (!CPFValidator.isValid(noMaskCPF)) {
            throw new PaymentException("CPF Inválido", "INVALID_CPF");
        }

        if (Period.between(request.birthDate, LocalDate.now()).getYears() < 18) {
            throw new PaymentException("Titular do cartão deve ter 18 anos ou mais de idade", "UNDERAGE");
        }

        String cardBrand = CardBrandValidator.getCardBrand(noMaskCard);
        if (cardBrand == null) {
            throw new PaymentException("O cartão informado deve ser Visa ou Mastercard", "INVALID_CARD");
        }

        return new PaymentResponseDTO("success", "Pagamento processado", cardBrand);
    }

}
