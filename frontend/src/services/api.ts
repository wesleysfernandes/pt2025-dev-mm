import axios from 'axios';

const apiPayment = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interface para os dados de pagamento
export interface PaymentData {
  ownerName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cpf: string;
  fullName: string;
  birthDate: string;
}

// Função para enviar os dados de pagamento
export const processPayment = async (data: PaymentData) => {
  try {
    // Formatar os dados para o formato esperado pelo backend
    const payload = {
        ownerName: data.ownerName,
        cardNumber: data.cardNumber.split(" ").join(""),
        expirationDate: data.expirationDate, 
        cvv: data.cvv,
        cpf: data.cpf.replace(/\D/g, ''),
        birthDate: data.birthDate.split("/").reverse().join("-")
    };

    const response = await apiPayment.post('/payment', payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Se a resposta da API contém uma mensagem de erro, usamos ela
      const errorMessage = error.response?.data?.message || 'Erro ao processar pagamento';
      throw new Error(errorMessage);
    } else {
      throw new Error('Erro desconhecido ao processar pagamento');
    }
  }
};