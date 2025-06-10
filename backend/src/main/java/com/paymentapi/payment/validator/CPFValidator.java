package com.paymentapi.payment.validator;

public class CPFValidator {

    public static boolean isValid(String cpf) {

        int sumTestOne = 0;
        for (int i = 0; i < 9; i++) {
            sumTestOne += Character.getNumericValue(cpf.charAt(i)) * (10 - i);
        }
        int testOne = (sumTestOne * 10) % 11;

        int sumTestTwo = 0;
        for (int i = 0; i < 10; i++) {
            sumTestTwo += Character.getNumericValue(cpf.charAt(i)) * (11 - i);
        }
        int testTwo = (sumTestTwo * 10) % 11;

        if (testOne > 9)
            testOne = 0;
        if (testTwo > 9)
            testTwo = 0;

        return testOne == Character.getNumericValue(cpf.charAt(9))
                && testTwo == Character.getNumericValue(cpf.charAt(10));

    }

}
