import { motion } from 'motion/react';
const virusLogo = "/images/virus_logo.png"
const virusImage = "/images/virus_logo.png"
interface LogoProps {
  variant?: 'full' | 'icon' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const sizes = {
  sm: { icon: 36, text: 'text-lg' as const },
  md: { icon: 52, text: 'text-2xl' as const },
  lg: { icon: 72, text: 'text-3xl' as const },
};

export function Logo({ variant = 'full', size = 'md', animated = true, className = '' }: LogoProps) {
  const currentSize = sizes[size];

  const VirusIcon = ({ size: iconSize }: { size: number }) => (
    <motion.div
      className="relative flex-shrink-0"
      style={{ width: iconSize, height: iconSize }}
      animate={animated ? { scale: [1, 1.06, 1] } : {}}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <img
        src={virusLogo}
        alt="VIRUS"
        className="w-full h-full object-contain drop-shadow-[0_0_8px_var(--glow-brand-50)]"
      />
    </motion.div>
  );

  if (variant === 'icon') {
    return (
      <div className={className}>
        <VirusIcon size={currentSize.icon} />
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <VirusIcon size={currentSize.icon} />
        <div className="flex items-baseline gap-2">
          <span className={`${currentSize.text} font-display bg-gradient-to-r from-brand-light to-brand-dark bg-clip-text text-transparent`}>
            VIRUS
          </span>
          <span className="text-sm text-content-secondary">TOKEN</span>
        </div>
      </div>
    );
  }

  /* Full variant - stacked */
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <VirusIcon size={currentSize.icon} />
      <div className="text-center">
        <div className={`${currentSize.text} font-display bg-gradient-to-r from-brand-light to-brand-dark bg-clip-text text-transparent`}>
          VIRUS
        </div>
        <div className="text-xs text-content-secondary tracking-wider">TOKEN</div>
      </div>
    </div>
  );
}
