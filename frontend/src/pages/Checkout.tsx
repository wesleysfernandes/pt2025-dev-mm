import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import { Card } from "../components/Card";
import { Section } from "../components/Form/Section";
import { InputField } from "../components/Form/InputField";
import { Button } from "../components/Button";
import { CardBrandIcon } from "../components/Form/CardBrandIcon";
import {
  applyCardMask,
  applyCPFMask,
  applyExpiryMask,
  applyBirthDateMask,
} from "../utils/masks";
import { type PaymentData, processPayment } from "../services/api"; // Importe a interface e a função
import { useState } from "react"; // Importe o useState

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FeedbackMessage = styled.div<{ $success?: boolean }>`
  padding: 12px;
  border-radius: 4px;
  background: ${({ $success }) => ($success ? "#e6fffa" : "#fff1f0")};
  color: ${({ $success }) => ($success ? "#004d40" : "#c53030")};
  border: 1px solid ${({ $success }) => ($success ? "#b7eb8f" : "#ffccc7")};
`;

const schema = yup.object().shape({
  cardNumber: yup
    .string()
    .required("Número do cartão é obrigatório")
    .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Número inválido"),
  ownerName: yup.string().required("Nome do titular é obrigatório"),
  expirationDate: yup
    .string()
    .required("Validade é obrigatória")
    .matches(/^\d{2}\/\d{2}$/, "Formato inválido (MM/AA)"),
  cvv: yup
    .string()
    .required("CVV é obrigatório")
    .matches(/^\d{3}$/, "CVV inválido"),
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  fullName: yup.string().required("Nome completo é obrigatório"),
  birthDate: yup
    .string()
    .required("Data de nascimento é obrigatória")
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Formato inválido (DD/MM/AAAA)")
    .test("age", "Deve ter pelo menos 18 anos", (value) => {
      if (!value) return false;

      const [day, month, year] = value.split("/").map(Number);
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age >= 18;
    }),
});

export const CheckoutPage = () => {
  const { register, handleSubmit, formState, watch, reset } =
    useForm<PaymentData>({
      resolver: yupResolver(schema),
      mode: "onChange",
    });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const cardNumber = watch("cardNumber", "");
  const isFormValid = formState.isValid;

  const onSubmit = async (data: PaymentData) => {
    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = await processPayment(data);

      // Mensagem de sucesso
      setSuccessMessage(result.message || "Pagamento processado com sucesso!");

      // Resetar formulário após 3 segundos
      setTimeout(() => {
        reset();
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      let message = "Erro ao processar pagamento";
      if (error instanceof Error) {
        message = error.message;
      }
      setErrorMessage(message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <h1>Checkout de Pagamento</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <Section title="Dados do Cartão">
            <div style={{ position: "relative" }}>
              <InputField
                {...register("cardNumber")}
                placeholder="0000 0000 0000 0000"
                error={formState.errors.cardNumber?.message}
                mask={applyCardMask}
              />
              <CardBrandIcon cardNumber={cardNumber} />
            </div>

            <InputField
              {...register("ownerName")}
              placeholder="Nome do Titular"
              error={formState.errors.ownerName?.message}
            />

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <InputField
                  {...register("expirationDate")}
                  placeholder="MM/AA"
                  error={formState.errors.expirationDate?.message}
                  mask={applyExpiryMask}
                />
              </div>
              <div style={{ flex: 1 }}>
                <InputField
                  {...register("cvv")}
                  placeholder="CVV"
                  error={formState.errors.cvv?.message}
                  type="password"
                />
              </div>
            </div>
          </Section>

          <Section title="Informações Fiscais">
            <InputField
              {...register("cpf")}
              placeholder="000.000.000-00"
              error={formState.errors.cpf?.message}
              mask={applyCPFMask}
            />

            <InputField
              {...register("fullName")}
              placeholder="Nome Completo"
              error={formState.errors.fullName?.message}
            />

            <InputField
              {...register("birthDate")}
              placeholder="DD/MM/AAAA"
              error={formState.errors.birthDate?.message}
              mask={applyBirthDateMask}
            />
          </Section>

          {/* Mensagens de feedback */}
          {errorMessage && <FeedbackMessage>{errorMessage}</FeedbackMessage>}

          {successMessage && (
            <FeedbackMessage $success>{successMessage}</FeedbackMessage>
          )}

          <Button
            type="submit"
            $disabled={!isFormValid || isProcessing}
            aria-busy={isProcessing}
          >
            {isProcessing ? "Processando..." : "Processar Pagamento"}
          </Button>
        </FormContainer>
      </form>
    </Card>
  );
};
