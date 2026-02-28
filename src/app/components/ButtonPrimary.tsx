import { type ReactNode } from 'react';

interface ButtonPrimaryProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ButtonPrimary({ children, onClick, className = '' }: ButtonPrimaryProps) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-darker rounded-full text-content-primary hover:shadow-lg hover:shadow-brand-primary/50 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}
