import styled from 'styled-components';
import { cyberpunkTheme } from '../Providers/ThemeProvider';

type AvatarProps = {
  firstName: string;
  lastName: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
};

export const getInitials = (firstName: string, lastName: string): string => {
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
  return `${firstInitial}${lastInitial}`;
};

const AvatarWrapper = styled.div<{ $textColor: string; size: number; $backgroundColor: string }>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $textColor }) => $textColor};
  font-size: ${({ size }) => `${size * 0.4}px`};
  font-weight: bold;
`;

const Avatar = ({
  firstName,
  lastName,
  size = 40,
  backgroundColor = cyberpunkTheme.colors.neonBlue,
  textColor = cyberpunkTheme.colors.textPrimary
}: AvatarProps) => {
  const initials = getInitials(firstName, lastName);

  return (
    <AvatarWrapper
      role="img"
      aria-label={`Avatar for ${firstName} ${lastName}`}
      $textColor={textColor}
      size={size}
      $backgroundColor={backgroundColor}
    >
      {initials}
    </AvatarWrapper>
  );
};

export default Avatar;
