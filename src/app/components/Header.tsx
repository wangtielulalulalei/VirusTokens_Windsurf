import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import { ButtonPrimary } from './ButtonPrimary';
import { Menu, X, Users, ChevronDown, Globe } from 'lucide-react';
import { useState, useCallback } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useLanguage } from '../contexts/LanguageContext';
import './ui/icon.css';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [qqCopied, setQqCopied] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const handleCopyQQ = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText('581376649');
      setQqCopied(true);
      setTimeout(() => setQqCopied(false), 2000);
    } catch {
      // 兜底：选中文本
      const el = document.createElement('textarea');
      el.value = '581376649';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setQqCopied(true);
      setTimeout(() => setQqCopied(false), 2000);
    }
  }, []);

  const navItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.mechanisms, href: '#mechanisms' },
    { label: t.nav.roadmap, href: '#roadmap' },
    { label: t.nav.community, href: '#community' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-surface-overlay backdrop-blur-lg border-b border-line-default"
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Logo variant="horizontal" size="sm" />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Navigation items temporarily hidden */}
        </nav>

        {/* Language Toggle & CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="px-4 py-3 bg-surface-overlay rounded-lg text-content-secondary hover:text-brand-primary transition-all duration-300 text-sm flex items-center gap-2 border border-line-default hover:border-brand-primary/50"
            title={language === 'zh' ? 'Switch to English' : '切换到中文'}
          >
            <Globe className="w-4 h-4" />
            <span className="font-medium">{language === 'zh' ? '中' : 'EN'}</span>
          </button>

          {/* Community Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-darker rounded-lg text-content-primary hover:shadow-lg hover:shadow-brand-primary/50 transition-all duration-300 text-sm flex items-center gap-2 border border-brand-primary/20">
                <Users className="w-4 h-4" />
                {t.header.joinCommunity}
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[160px] rounded-lg border border-line-default">
              <DropdownMenuItem asChild>
                <button
                  onClick={handleCopyQQ}
                  className="flex items-center gap-3 w-full cursor-pointer"
                >
                  <img src="/images/qq.svg" alt="QQ" className="w-5 h-5 icon-unified" />
                  <span className="flex-1 text-left">{t.header.qqCommunity}</span>
                  <span className="text-xs text-brand-primary ml-1">
                    {qqCopied ? (language === 'zh' ? '✓ 已复制' : '✓ Copied') : '581376649'}
                  </span>
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href="https://t.me/VIRUSBNB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full"
                >
                  <img src="/images/telegram.svg" alt="Telegram" className="w-5 h-5 icon-unified" />
                  <span>{t.header.telegram}</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href="https://x.com/virus_cto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full"
                >
                  <svg className="w-5 h-5 icon-unified" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>{t.header.x}</span>
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-content-secondary hover:text-brand-primary"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-surface-overlay border-b border-line-default lg:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Navigation items temporarily hidden */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className="md:hidden mt-4 p-4 bg-surface-body/80 backdrop-blur-lg border border-line-default rounded-lg"
        >
          <nav className="flex flex-col gap-4">
            {/* Language Toggle */}
            <div className="flex items-center justify-between p-3 bg-surface-card rounded-lg border border-line-default">
              <span className="text-sm text-content-secondary">语言 / Language</span>
              <button
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-brand-primary text-white rounded-md hover:bg-brand-primary/90 transition-colors"
              >
                {language === 'zh' ? 'EN' : '中文'}
              </button>
            </div>

            {/* Join Community Section */}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-content-primary mb-3">{t.header.joinCommunity}</h3>
              <div className="space-y-2">
                {/* QQ Community - 点击复制群号 */}
                <button
                  onClick={handleCopyQQ}
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm text-content-secondary hover:text-brand-primary transition-colors rounded-md hover:bg-surface-hover"
                >
                  <img src="/images/qq.svg" alt="QQ" className="w-4 h-4 icon-unified" />
                  <span className="flex-1 text-left">{t.header.qqCommunity}</span>
                  <span className="text-xs text-brand-primary">
                    {qqCopied ? (language === 'zh' ? '✓ 已复制' : '✓ Copied') : '581376649'}
                  </span>
                </button>
                {/* Telegram */}
                <a
                  href="https://t.me/VIRUSBNB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm text-content-secondary hover:text-brand-primary transition-colors rounded-md hover:bg-surface-hover"
                >
                  <img src="/images/telegram.svg" alt="Telegram" className="w-4 h-4 icon-unified" />
                  <span>{t.header.telegram}</span>
                </a>
                {/* X (Twitter) */}
                <a
                  href="https://x.com/virus_cto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm text-content-secondary hover:text-brand-primary transition-colors rounded-md hover:bg-surface-hover"
                >
                  <svg className="w-4 h-4 icon-unified" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>{t.header.x}</span>
                </a>
              </div>
            </div>
          </nav>
        </motion.div>
      )}
      {/* QQ 复制成功 Toast */}
      <AnimatePresence>
        {qqCopied && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]
                       px-5 py-3 rounded-xl
                       bg-surface-card border border-brand-primary/40
                       shadow-lg shadow-brand-primary/20
                       flex items-center gap-2 text-sm"
          >
            <span className="text-brand-primary">✓</span>
            <span className="text-content-primary">
              {language === 'zh' ? 'QQ群号 581376649 已复制' : 'QQ Group 581376649 Copied'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}