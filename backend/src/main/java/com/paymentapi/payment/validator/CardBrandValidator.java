package com.paymentapi.payment.validator;

public class CardBrandValidator {

    public static String getCardBrand(String cardNumber) {

        if (cardNumber.startsWith("4"))
            return "Visa";

        int test = Integer.valueOf(cardNumber.substring(0, 2));
        if ((test >= 51 && test <= 55) || (test >= 2221 && test <= 2720))
            return "MasterCard";
        return null;
    }

}
