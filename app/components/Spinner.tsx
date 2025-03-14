import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const ripple = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0.1),
                0 0 0 20px rgba(var(--primary-rgb), 0.1),
                0 0 0 40px rgba(var(--primary-rgb), 0.1);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(var(--primary-rgb), 0.1),
                0 0 0 40px rgba(var(--primary-rgb), 0.1),
                0 0 0 60px rgba(var(--primary-rgb), 0);
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const SpinnerCircle = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.background};
  border-top: 3px solid ${({ theme }) => theme.colors.neonPink};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background: ${({ theme }) => theme.colors.neonPink};
    border-radius: 50%;
    animation: ${ripple} 1.5s linear infinite;
  }
`;

export const Spinner = () => (
  <SpinnerWrapper>
    <SpinnerCircle />
  </SpinnerWrapper>
);
