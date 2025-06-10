import React, { type ForwardedRef } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  margin-bottom: 16px;
  position: relative;
`;

const StyledInput = styled.input<{ $hasError: boolean }>`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ $hasError }) => ($hasError ? "#ff4d4f" : "#d9d9d9")};
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #1890ff;
  }
`;

const ErrorText = styled.span`
  color: #ff4d4f;
  font-size: 12px;
  display: block;
  margin-top: 4px;
`;

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  mask?: (value: string) => string;
}

export const InputField = React.forwardRef(
  (
    { error, mask, onChange, ...props }: InputFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (mask) {
        e.target.value = mask(e.target.value);
      }

      if (onChange) {
        onChange(e);
      }
    };

    return (
      <InputContainer>
        <StyledInput
          ref={ref}
          onChange={handleInputChange}
          $hasError={!!error}
          {...props}
        />
        {error && <ErrorText>{error}</ErrorText>}
      </InputContainer>
    );
  }
);
