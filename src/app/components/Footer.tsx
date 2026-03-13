import { motion, AnimatePresence } from 'motion/react';
import { Twitter, Send, Github, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from '../contexts/LanguageContext';
import React, { useState, useCallback } from 'react';

export function Footer() {
  const { t, language } = useLanguage();

  // 状态管理
  const [qqCopied, setQqCopied] = useState(false);

  // QQ复制功能
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

  // 快速链接 - 传递回调函数
  const quickLinks = [
    { 
      label: t.footer.whitepaper, 
      href: '#',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        // 触发白皮书抽屉打开
        const event = new CustomEvent('openWhitepaper');
        window.dispatchEvent(event);
      }
    },
    { 
      label: t.hero.buyToken, 
      href: "https://pancakeswap.finance/swap?outputCurrency=0xa1ed61902f13e162305f59e1b2475e269e647777",
      target: "_blank"
    },
    { 
      label: t.header.joinCommunity, 
      href: '#',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        // 滚动到导航栏并触发加入社区下拉菜单
        const header = document.querySelector('header');
        if (header) {
          header.scrollIntoView({ behavior: 'smooth' });
          // 触发加入社区按钮点击
          setTimeout(() => {
            const joinButton = document.querySelector('[data-join-community]') as HTMLButtonElement;
            if (joinButton) {
              joinButton.click();
            }
          }, 500);
        }
      }
    },
  ];

  // 资源链接
  const resources = [
    { 
      label: t.footer.realtimeRecords, 
      href: 'https://dexscreener.com/bsc/0xe77128c1c4d1775a55cc44b40ce7658bcc7ef382',
      target: "_blank"
    },
    { 
      label: t.footer.devCode, 
      href: 'https://bscscan.com/token/0xa1ed61902f13e162305f59e1b2475e269e647777#code',
      target: "_blank"
    },
    { 
      label: t.footer.airdropRecords, 
      href: 'https://bscscan.com/token/0xa1ed61902f13e162305f59e1b2475e269e647777?a=0x96D973C3F99486D427bA0117715F2355f02208D9',
      target: "_blank"
    },
  ];

  // 社交媒体链接 - 只保留四个
  const socialLinks = [
    { 
      icon: Twitter, 
      href: 'https://x.com/virus_cto', 
      label: 'X (Twitter)',
      target: "_blank"
    },
    { 
      icon: Send, 
      href: 'https://t.me/VIRUSBNB', 
      label: 'Telegram',
      target: "_blank"
    },
    { 
      icon: MessageCircle, 
      href: '#', 
      label: 'QQ',
      onClick: handleCopyQQ
    },
    { 
      icon: Github, 
      href: 'https://github.com/wangtielulalulalei/VirusTokens_Windsurf', 
      label: 'Github',
      target: "_blank"
    },
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
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className="text-sm text-content-secondary hover:text-brand-primary transition-colors text-left w-full font-normal"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      target={link.target}
                      rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                      className="text-sm text-content-secondary hover:text-brand-primary transition-colors font-normal"
                    >
                      {link.label}
                    </a>
                  )}
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
                    target={link.target}
                    rel="noopener noreferrer"
                    className="text-sm text-content-secondary hover:text-brand-primary transition-colors font-normal"
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
                social.onClick ? (
                  <button
                    key={social.label}
                    onClick={social.onClick}
                    aria-label={social.label}
                    className="p-2 bg-surface-subtle border border-line-default rounded-sm hover:bg-brand-primary/10 hover:border-line-brand transition-all duration-300"
                  >
                    <social.icon className="w-[20px] h-[20px]" />
                  </button>
                ) : (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.target}
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2 bg-surface-subtle border border-line-default rounded-sm hover:bg-brand-primary/10 hover:border-line-brand transition-all duration-300"
                  >
                    <social.icon className="w-[20px] h-[20px]" />
                  </a>
                )
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
              {language === 'zh' ? 'QQ群号已复制' : 'QQ Group Copied'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
