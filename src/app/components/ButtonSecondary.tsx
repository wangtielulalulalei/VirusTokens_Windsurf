import { type ReactNode } from 'react';

interface ButtonSecondaryProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ButtonSecondary({ children, onClick, className = '' }: ButtonSecondaryProps) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-4 bg-surface-subtle border border-line-default rounded-full text-content-primary hover:bg-content-primary/10 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}
