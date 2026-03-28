import { motion } from 'motion/react';
import { TrendingUp, Users, Globe, Coins } from 'lucide-react';
import { VirusPattern, VirusBadge } from './VirusDecorations';
import { ButtonPrimary } from './ButtonPrimary';
import { ButtonSecondary } from './ButtonSecondary';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  virusImage: string;
  onWhitepaperOpen: () => void; // ← 新增：点击白皮书按钮的回调
}

export function Hero({ virusImage, onWhitepaperOpen }: HeroProps) {
  const { t } = useLanguage();

  const quickStats = [
    { icon: Coins, label: t.hero.stats.totalSupply, value: '1.0B' },
    { icon: TrendingUp, label: t.hero.stats.exchanges, value: '10+' },
    { icon: Globe, label: t.hero.stats.network, value: 'BSC' },
  ];

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:py-20 lg:py-28 mt-16">
      <VirusPattern />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-12 -right-12 w-[320px] h-[320px] bg-brand-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-[240px] -left-12 w-[320px] h-[320px] bg-brand-dark/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col gap-4 lg:gap-6 text-center lg:text-left"
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
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display"
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
              className="text-base sm:text-lg text-content-secondary leading-relaxed"
            >
              {t.hero.subtitleText}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <a
                href="https://bscscan.com/address/0xa1ed61902f13e162305f59e1b2475e269e647777"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ButtonPrimary>代币合约</ButtonPrimary>
              </a>
              {/* 白皮书按钮：点击打开抽屉 */}
              <ButtonSecondary onClick={onWhitepaperOpen}>
                {t.hero.whitepaper}
              </ButtonSecondary>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6 justify-center lg:justify-start"
            >
              {quickStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <stat.icon className="w-[18px] sm:w-[20px] h-[18px] sm:h-[20px] text-brand-primary" />
                  <div>
                    <div className="text-xs sm:text-sm text-content-muted">{stat.label}</div>
                    <div className="text-base sm:text-lg font-display">{stat.value}</div>
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
            className="flex-1 flex items-center justify-center relative lg:mt-0 mt-8"
          >
            <motion.div
              className="absolute w-[110%] h-[110%] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, var(--glow-brand-15) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-[130%] h-[130%] rounded-full border-2 border-brand-primary/20 pointer-events-none"
              animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              animate={{ y: [0, -18, 0], rotate: [0, 3, 0, -3, 0] }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="relative w-full max-w-[400px] mx-auto"
            >
              <div
                className="absolute inset-0 blur-3xl opacity-40 pointer-events-none"
                style={{ background: 'radial-gradient(circle, var(--glow-brand-60) 0%, var(--glow-green-30) 50%, transparent 70%)' }}
              />
              <motion.img
                src={virusImage}
                alt="VIRUS Token Mascot"
                className="relative w-full h-auto drop-shadow-[0_0_40px_var(--glow-brand-40)]"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
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
                style={{ left: particle.x, top: particle.y, width: particle.size, height: particle.size }}
                animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.3, 0.8] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
