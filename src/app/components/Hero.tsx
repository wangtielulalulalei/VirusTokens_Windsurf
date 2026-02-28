import { motion } from 'motion/react';
import { TrendingUp, Users, Globe } from 'lucide-react';
import { VirusPattern, VirusBadge } from './VirusDecorations';
import { ButtonPrimary } from './ButtonPrimary';
import { ButtonSecondary } from './ButtonSecondary';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  virusImage: string;
}

export function Hero({ virusImage }: HeroProps) {
  const { t } = useLanguage();

  const quickStats = [
    { icon: TrendingUp, label: t.hero.stats.exchanges, value: '200+' },
    { icon: Users, label: t.hero.stats.holders, value: '26M+' },
    { icon: Globe, label: t.hero.stats.network, value: 'BSC' },
  ];
  return (
    <section className="relative overflow-hidden px-4 py-28 sm:py-28 mt-16">
      {/* Virus pattern background */}
      <VirusPattern />

      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-12 -right-12 w-[320px] h-[320px] bg-brand-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-[240px] -left-12 w-[320px] h-[320px] bg-brand-dark/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <VirusBadge text={t.hero.network} variant="success" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-display"
            >
              <span className="text-content-primary">{t.hero.title}</span>
              <br />
              <span className="bg-gradient-to-r from-brand-light to-brand-dark bg-clip-text text-transparent">
                {t.hero.subtitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-content-secondary leading-relaxed"
            >
              {t.hero.subtitleText}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <a 
                href="https://pancakeswap.finance/swap?outputCurrency=0xa1ed61902f13e162305f59e1b2475e269e647777" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ButtonPrimary>{t.hero.buyToken}</ButtonPrimary>
              </a>
              <ButtonSecondary>{t.hero.whitepaper}</ButtonSecondary>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-8 mt-6"
            >
              {quickStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <stat.icon className="w-[20px] h-[20px] text-brand-primary" />
                  <div>
                    <div className="text-sm text-content-muted">{stat.label}</div>
                    <div className="text-lg font-display">{stat.value}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Virus mascot image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex items-center justify-center relative"
          >
            {/* Ambient glow ring */}
            <motion.div
              className="absolute w-[110%] h-[110%] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, var(--glow-brand-15) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Secondary pulse ring */}
            <motion.div
              className="absolute w-[130%] h-[130%] rounded-full border-2 border-brand-primary/20 pointer-events-none"
              animate={{
                scale: [0.9, 1.1, 0.9],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />

            {/* Main floating virus image */}
            <motion.div
              animate={{
                y: [0, -18, 0],
                rotate: [0, 3, 0, -3, 0],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                rotate: {
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              className="relative w-full max-w-[400px] mx-auto"
            >
              {/* Glow shadow behind image */}
              <div
                className="absolute inset-0 blur-3xl opacity-40 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, var(--glow-brand-60) 0%, var(--glow-green-30) 50%, transparent 70%)',
                }}
              />

              <motion.img
                src={virusImage}
                alt="VIRUS Token Mascot"
                className="relative w-full h-auto drop-shadow-[0_0_40px_var(--glow-brand-40)]"
                animate={{
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            {/* Floating sparkle particles */}
            {[
              { x: '10%', y: '15%', delay: 0, size: 6 },
              { x: '85%', y: '20%', delay: 0.5, size: 4 },
              { x: '5%', y: '75%', delay: 1, size: 5 },
              { x: '90%', y: '70%', delay: 1.5, size: 4 },
              { x: '50%', y: '5%', delay: 2, size: 5 },
              { x: '45%', y: '95%', delay: 2.5, size: 3 },
            ].map((particle, index) => (
              <motion.div
                key={`sparkle-${index}`}
                className="absolute rounded-full bg-brand-primary pointer-events-none"
                style={{
                  left: particle.x,
                  top: particle.y,
                  width: particle.size,
                  height: particle.size,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.3, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
