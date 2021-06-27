import { ReactNode, ButtonHTMLAttributes } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../hooks/useTheme';
import '../styles/themeButton.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
};

export function ThemeButton({ children, ...props }: ButtonProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={`theme`} onClick={toggleTheme}>
      <div>{theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}</div>
    </button>
  );
}
