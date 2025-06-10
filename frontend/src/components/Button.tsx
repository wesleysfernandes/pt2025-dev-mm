import styled from "styled-components";

interface ButtonProps {
  $disabled?: boolean;
}

export const Button = styled.button<ButtonProps>`
  background-color: ${({ $disabled }) => ($disabled ? "#ccc" : "#1890ff")};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  width: 100%;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ $disabled }) => ($disabled ? "#ccc" : "#40a9ff")};
  }
`;
