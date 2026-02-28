import { motion } from 'motion/react';
const virusImage = "/images/virus_logo.png"
const virusLogo = "/images/virus_logo.png"
import { DNAHelix, VirusBadge } from './VirusDecorations';
import { CardToken } from './CardToken';
import { SectionHeader } from './SectionHeader';
import { Zap, Shield, Users, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Features() {
  const { t } = useLanguage();

  const features = [
    {
      id: 'feat-auto',
      icon: Zap,
      title: t.features.features.auto.title,
      description: t.features.features.auto.description,
      gradient: 'from-brand-primary to-accent-yellow',
    },
    {
      id: 'feat-secure',
      icon: Shield,
      title: t.features.features.secure.title,
      description: t.features.features.secure.description,
      gradient: 'from-brand-dark to-accent-green',
    },
    {
      id: 'feat-community',
      icon: Users,
      title: t.features.features.community.title,
      description: t.features.features.community.description,
      gradient: 'from-accent-green to-brand-primary',
    },
    {
      id: 'feat-growth',
      icon: TrendingUp,
      title: t.features.features.growth.title,
      description: t.features.features.growth.description,
      gradient: 'from-accent-yellow to-brand-dark',
    },
  ];
  return (
    <section className="relative px-4 py-16 overflow-hidden">
      {/* DNA helix decorations */}
      <div className="absolute left-0 top-1/4 opacity-20 hidden lg:block pointer-events-none">
        <DNAHelix />
      </div>
      <div className="absolute right-0 top-1/2 opacity-20 hidden lg:block pointer-events-none">
        <DNAHelix />
      </div>

      <div className="relative max-w-[1280px] mx-auto">
        {/* Section Header with virus icon */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="flex justify-center mb-6"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src={virusLogo}
              alt="VIRUS"
              className="w-[96px] h-[96px] object-contain drop-shadow-[0_0_20px_var(--glow-brand-50)]"
            />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl mb-4 font-display">
            {t.features.whyChoose}{' '}
            <span className="bg-gradient-to-r from-brand-light to-brand-dark bg-clip-text text-transparent">
              {t.features.whyChooseTitle}
            </span>
          </h2>
          <p className="text-lg text-content-secondary max-w-3xl mx-auto">
            {t.features.whyChooseDesc}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <CardToken className="p-8 relative overflow-hidden">
                {/* Icon */}
                <div
                  className={`inline-flex p-4 bg-gradient-to-br ${feature.gradient} rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-content-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display mb-3">{feature.title}</h3>
                <p className="text-content-secondary leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative corner glow */}
                <div className="absolute top-0 right-0 w-[160px] h-[160px] bg-gradient-to-br from-brand-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </CardToken>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <VirusBadge text={t.features.joinEcosystem} variant="success" />
        </motion.div>
      </div>
    </section>
  );
}
