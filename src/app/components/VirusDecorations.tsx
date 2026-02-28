import { motion } from 'motion/react';

/* ===== Floating virus particles for background decoration ===== */
export function FloatingVirusParticles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: `particle-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 30 + 20,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        >
          <VirusParticle size={particle.size} />
        </motion.div>
      ))}
    </div>
  );
}

/* ===== Single virus particle SVG ===== */
function VirusParticle({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.1 }}
    >
      <circle cx="50" cy="50" r="25" fill="url(#particleGradient)" />
      {[0, 90, 180, 270].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * 35;
        const y = 50 + Math.sin(rad) * 35;
        return (
          <circle
            key={`spike-${angle}`}
            cx={x}
            cy={y}
            r="3"
            fill="var(--color-brand-primary)"
          />
        );
      })}
      <defs>
        <radialGradient id="particleGradient">
          <stop offset="0%" stopColor="var(--color-brand-primary)" />
          <stop offset="100%" stopColor="var(--color-brand-dark)" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ===== Virus pattern for section backgrounds ===== */
export function VirusPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="virusPattern"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="100" cy="100" r="20" fill="var(--color-brand-primary)" opacity="0.3" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const x = 100 + Math.cos(rad) * 30;
              const y = 100 + Math.sin(rad) * 30;
              return (
                <circle
                  key={`pattern-${angle}`}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="var(--color-brand-primary)"
                  opacity="0.3"
                />
              );
            })}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#virusPattern)" />
      </svg>
    </div>
  );
}

/* ===== Animated virus icon for loading or emphasis ===== */
export function AnimatedVirusIcon({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer glow ring */}
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#glowGradient)"
        strokeWidth="2"
        fill="none"
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1.2, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
      />

      {/* Main body with pulse */}
      <motion.circle
        cx="50"
        cy="50"
        r="28"
        fill="url(#bodyGradientAnim)"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rotating spikes */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '50px', originY: '50px' }}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 50 + Math.cos(rad) * 28;
          const y1 = 50 + Math.sin(rad) * 28;
          const x2 = 50 + Math.cos(rad) * 40;
          const y2 = 50 + Math.sin(rad) * 40;

          return (
            <g key={`anim-spike-${angle}`}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--color-brand-dark)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <motion.circle
                cx={x2}
                cy={y2}
                r="4"
                fill="var(--color-brand-darker)"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.1,
                  ease: 'easeInOut',
                }}
              />
            </g>
          );
        })}
      </motion.g>

      {/* Inner details */}
      <motion.g
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="42" cy="45" r="3" fill="var(--color-brand-light)" />
        <circle cx="58" cy="48" r="2.5" fill="var(--color-brand-light)" />
        <circle cx="50" cy="55" r="2" fill="var(--color-brand-light)" />
      </motion.g>

      <defs>
        <radialGradient id="bodyGradientAnim">
          <stop offset="0%" stopColor="var(--color-brand-dark)" />
          <stop offset="70%" stopColor="var(--color-brand-darker)" />
          <stop offset="100%" stopColor="var(--color-brand-deepest)" />
        </radialGradient>
        <radialGradient id="glowGradient">
          <stop offset="0%" stopColor="var(--color-brand-dark)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--color-brand-darker)" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ===== DNA helix decoration ===== */
export function DNAHelix() {
  return (
    <svg
      width="100"
      height="300"
      viewBox="0 0 100 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: 20 }, (_, i) => {
        const y = i * 15;
        const offset1 = Math.sin((i * Math.PI) / 5) * 30;
        const offset2 = -offset1;

        return (
          <g key={`dna-${i}`}>
            <motion.circle
              cx={50 + offset1}
              cy={y}
              r="3"
              fill="var(--color-brand-primary)"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
            />
            <motion.circle
              cx={50 + offset2}
              cy={y}
              r="3"
              fill="var(--color-brand-dark)"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1 + 1,
                ease: 'easeInOut',
              }}
            />
            <line
              x1={50 + offset1}
              y1={y}
              x2={50 + offset2}
              y2={y}
              stroke="var(--color-brand-primary)"
              strokeWidth="1"
              opacity="0.3"
            />
          </g>
        );
      })}
    </svg>
  );
}

/* ===== Simplified virus badge ===== */
export function VirusBadge({
  text,
  variant = 'success',
}: {
  text: string;
  variant?: 'success' | 'info' | 'warning';
}) {
  const variants = {
    success: 'from-brand-light to-brand-dark',
    info: 'from-brand-dark to-brand-darker',
    warning: 'from-warn-text to-warn-border',
  };

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-subtle border border-line-default rounded-full">
      <svg width="16" height="16" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="25" fill={`url(#badge-${variant})`} />
        {[0, 90, 180, 270].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x = 50 + Math.cos(rad) * 35;
          const y = 50 + Math.sin(rad) * 35;
          return (
            <circle
              key={`badge-spike-${angle}`}
              cx={x}
              cy={y}
              r="4"
              fill="var(--color-brand-primary)"
            />
          );
        })}
        <defs>
          <radialGradient id={`badge-${variant}`}>
            <stop offset="0%" stopColor="var(--color-brand-primary)" />
            <stop offset="100%" stopColor="var(--color-brand-dark)" />
          </radialGradient>
        </defs>
      </svg>
      <span
        className={`text-sm bg-gradient-to-r ${variants[variant]} bg-clip-text text-transparent`}
      >
        {text}
      </span>
    </div>
  );
}