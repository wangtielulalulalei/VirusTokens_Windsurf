import { motion } from 'motion/react';
import { type ReactNode } from 'react';

interface SectionHeaderProps {
  title: ReactNode;
  subtitle: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`text-center mb-16 ${className}`}
    >
      <h2 className="text-2xl sm:text-3xl mb-4 font-display">
        {title}
      </h2>
      <p className="text-lg text-content-secondary max-w-3xl mx-auto">
        {subtitle}
      </p>
    </motion.div>
  );
}
