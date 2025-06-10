import styled from "styled-components";

export const SectionContainer = styled.section`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
  color: #333;
  font-weight: 600;
`;

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const Section = ({ title, children }: SectionProps) => (
  <SectionContainer>
    <SectionTitle>{title}</SectionTitle>
    {children}
  </SectionContainer>
);
