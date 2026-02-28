import { type ReactNode } from 'react';

interface CardTokenProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function CardToken({ children, className = '', hover = true }: CardTokenProps) {
  return (
    <div
      className={`
        bg-gradient-to-br from-surface-card to-surface-card-end
        backdrop-blur-sm border border-line-default rounded-xl
        ${hover ? 'hover:border-line-brand transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
