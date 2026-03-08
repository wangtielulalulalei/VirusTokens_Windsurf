import { motion } from 'motion/react';
import { Twitter, Send, Github, Mail } from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t.footer.about, href: '#' },
    { label: t.footer.whitepaper, href: '#' },
    { label: t.footer.roadmap, href: '#' },
    { label: t.footer.team, href: '#' },
  ];

  const resources = [
    { label: t.footer.devDocs, href: '#' },
    { label: t.footer.smartContract, href: '#' },
    { label: t.footer.securityAudit, href: '#' },
    { label: t.footer.faq, href: '#' },
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Send, href: '#', label: 'Telegram' },
    { icon: Github, href: '#', label: 'Github' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  const bottomLinks = [
    { label: t.footer.privacy, href: '#' },
    { label: t.footer.terms, href: '#' },
    { label: t.footer.disclaimer, href: '#' },
  ];
  return (
    <footer className="relative px-4 py-16 border-t border-line-default">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center">
              <Logo variant="full" size="sm" animated={false} />
              <p className="text-sm text-content-secondary mt-4 text-center">
                {t.footer.description}
              </p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display mb-4">{t.footer.quickLinks}</h4>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-content-secondary hover:text-brand-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display mb-4">{t.footer.resources}</h4>
            <ul className="flex flex-col gap-2">
              {resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-content-secondary hover:text-brand-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-display mb-4">{t.footer.social}</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-surface-subtle border border-line-default rounded-sm hover:bg-brand-primary/10 hover:border-line-brand transition-all duration-300"
                >
                  <social.icon className="w-[20px] h-[20px]" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-8 border-t border-line-default flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-content-muted">
            &copy; 2026 VIRUS Token. {t.footer.rights}
          </p>
          <div className="flex gap-6 text-sm text-content-muted">
            {bottomLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-brand-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-warn-bg border border-warn-border rounded-xl"
        >
          <p className="text-xs text-warn-text text-center">
            {t.footer.disclaimerText}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
