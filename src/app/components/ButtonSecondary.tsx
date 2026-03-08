// ButtonSecondary.tsx — 新增 onClick 支持
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
      className={`
        px-6 py-3 rounded-xl font-display text-base
        border border-line-brand text-brand-primary
        hover:bg-brand-primary/10 active:scale-95
        transition-all duration-200
        ${className}
      `}
    >
      {children}
    </button>
  );
}
