import styled from "styled-components";

const BrandIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VisaLogo = styled.div`
  color: #1a1f71;
  font-weight: bold;
  font-size: 14px;
`;

const MastercardLogo = styled.div`
  display: flex;
  align-items: center;
`;

const MastercardCircle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 1px;

  &:first-child {
    background-color: #ff5f00;
  }

  &:last-child {
    background-color: #eb001b;
  }
`;

interface CardBrandIconProps {
  cardNumber: string;
}

export const CardBrandIcon = ({ cardNumber }: CardBrandIconProps) => {
  const cleanedCardNumber = cardNumber.replace(/\D/g, "");

  if (/^4/.test(cleanedCardNumber)) {
    return (
      <BrandIcon>
        <VisaLogo>VISA</VisaLogo>
      </BrandIcon>
    );
  }

  if (/^5[1-5]/.test(cleanedCardNumber)) {
    return (
      <BrandIcon>
        <MastercardLogo>
          <MastercardCircle />
          <MastercardCircle />
        </MastercardLogo>
      </BrandIcon>
    );
  }

  return null;
};
