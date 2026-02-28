import { motion } from 'motion/react';
import {
  Flame,
  TrendingUp,
  Shield,
  Users,
  Activity,
  DollarSign,
  Network,
  Vote,
  Rocket,
} from 'lucide-react';
import { CardToken } from './CardToken';
import { SectionHeader } from './SectionHeader';
import { useLanguage } from '../contexts/LanguageContext';

export function Mechanisms() {
  const { t } = useLanguage();

  const mechanisms = [
    {
      id: 'P1',
      icon: Flame,
      title: t.mechanisms.mechanisms.autoBurn.title,
      description: t.mechanisms.mechanisms.autoBurn.description,
      gradient: 'from-brand-light to-accent-yellow',
    },
    {
      id: 'P2',
      icon: TrendingUp,
      title: t.mechanisms.mechanisms.deflation.title,
      description: t.mechanisms.mechanisms.deflation.description,
      gradient: 'from-accent-yellow to-brand-primary',
    },
    {
      id: 'P3',
      icon: Activity,
      title: t.mechanisms.mechanisms.liquidity.title,
      description: t.mechanisms.mechanisms.liquidity.description,
      gradient: 'from-brand-primary to-brand-dark',
    },
  ];
  return (
    <section className="relative px-4 py-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-darker/10 to-transparent pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto">
        <SectionHeader
          title={t.mechanisms.title}
          subtitle={t.mechanisms.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mechanisms.map((mechanism, index) => (
            <motion.div
              key={mechanism.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group"
            >
              <CardToken className="p-6 h-full relative overflow-hidden">
                <div className="flex items-start gap-4">
                  {/* Icon with gradient */}
                  <div
                    className={`flex-shrink-0 p-3 bg-gradient-to-br ${mechanism.gradient} rounded-xl`}
                  >
                    <mechanism.icon className="w-6 h-6 text-content-primary" />
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    {/* Badge and Title */}
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 bg-brand-primary/10 border border-line-brand-subtle rounded-xs text-xs font-mono text-brand-light">
                        {mechanism.id}
                      </span>
                      <h3 className="text-lg font-display">{mechanism.title}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-content-secondary text-sm leading-relaxed">
                      {mechanism.description}
                    </p>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-[128px] h-[128px] bg-gradient-to-br from-brand-primary/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </CardToken>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-primary/10 to-brand-dark/10 border border-line-brand-subtle rounded-full">
            <TrendingUp className="w-[20px] h-[20px] text-brand-light" />
            <span className="text-brand-light text-sm">
              {t.mechanisms.valueProposition}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
