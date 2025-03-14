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

const Avatar = ({
  firstName,
  lastName,
  size = 40,
  backgroundColor = cyberpunkTheme.colors.neonBlue,
  textColor = cyberpunkTheme.colors.textPrimary
}: AvatarProps) => {
  const initials = getInitials(firstName, lastName);

  return (
    <div
      role="img"
      aria-label={`Avatar for ${firstName} ${lastName}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor,
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: textColor,
        fontSize: `${size * 0.4}px`,
        fontWeight: 'bold'
      }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
