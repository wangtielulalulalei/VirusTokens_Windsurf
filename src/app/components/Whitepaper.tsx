// src/components/Whitepaper.tsx
// 白皮书抽屉组件 — 支持中英文切换

import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, RefreshCw, Users, Coins, TrendingUp, Zap, Globe, Lock } from 'lucide-react';
import { CardToken } from './CardToken';
import { useLanguage } from '../contexts/LanguageContext';

interface WhitepaperProps {
  open: boolean;
  onClose: () => void;
}

function SectionTitle({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-brand-primary/10 border border-brand-primary/30 rounded-lg">
        <Icon className="w-5 h-5 text-brand-primary" />
      </div>
      <h2 className="text-xl font-display text-content-primary">{title}</h2>
    </div>
  );
}

function ParamRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-line-default last:border-0">
      <span className="text-sm text-content-muted">{label}</span>
      <span className="text-sm font-mono text-brand-primary">{value}</span>
    </div>
  );
}

function BulletItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 py-1">
      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2 shrink-0" />
      <span className="text-sm text-content-secondary leading-relaxed">{text}</span>
    </div>
  );
}

function LinkRow({ href, title, sub, label }: { href: string; title: string; sub: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-3 rounded-lg
                 bg-brand-primary/5 border border-brand-primary/20
                 hover:bg-brand-primary/10 hover:border-brand-primary/40
                 transition-all duration-200 group"
    >
      <div>
        <p className="text-sm font-bold text-content-primary group-hover:text-brand-primary transition-colors">{title}</p>
        <p className="text-xs text-content-muted mt-0.5 font-mono">{sub}</p>
      </div>
      <div className="flex items-center gap-2 text-brand-primary">
        <span className="text-xs">{label}</span>
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </a>
  );
}

export function Whitepaper({ open, onClose }: WhitepaperProps) {
  const { t, language } = useLanguage();
  const wp = t.whitepaper;

  // 根据语言切换的文字
  const isEn = language === 'en';
  const txt = {
    coreParams:      isEn ? 'Core Parameters'           : '核心参数',
    chain:           isEn ? 'Chain'                     : '所在链',
    chainVal:        isEn ? 'BNB Smart Chain (BSC)'     : 'BNB Smart Chain (BSC)',
    tax:             isEn ? 'Buy/Sell Tax'               : '买卖税率',
    taxVal:          isEn ? '3% each, locked till 2126' : '各 3%，永久锁死至 2126 年',
    lpStatus:        isEn ? 'LP Status'                 : 'LP 状态',
    lpVal:           isEn ? '99.9% Permanently Locked'  : '99.9% 永久锁仓',
    permission:      isEn ? 'Contract Permission'       : '合约权限',
    permissionVal:   isEn ? 'Burned to black hole'      : '已打入黑洞，无法修改',
    holders:         isEn ? 'Holder Addresses'          : '持币地址',
    holdersVal:      isEn ? '27M+'                      : '超过 2,700 万个',
    slippage:        isEn ? 'Recommended Slippage'      : '推荐滑点',
    slippageVal:     isEn ? '4% ~ 5%'                   : '4% ~ 5%',
    overview:        isEn ? 'Project Overview'          : '项目概述',
    mechanism:       isEn ? 'Core Mechanisms'           : '核心机制',
    buybackTitle:    isEn ? 'Auto Buyback & Burn'       : '自动回购与销毁',
    buybackDesc:     isEn ? 'Every buy/sell transaction charges 3% tax, 100% flowing into the buyback vault. Every 0.1 BNB accumulated triggers an automatic step-buy, compressing circulating supply continuously.' : '每笔买卖交易征收 3% 税收，100% 强制流入回购金库。每当金库积累 0.1 BNB，立即触发碎步买入，持续压缩流通盘。',
    stepBuy:         isEn ? 'Step-Buy Strategy'         : '碎步买入策略',
    stepBuy1:        isEn ? 'Prevents whale arbitrage, protecting ordinary holders' : '有效防止大户套利，保护普通持币者利益',
    stepBuy2:        isEn ? 'Forms a continuous uptrend line on the chart'          : '在 K 线上形成持续上涨趋势线',
    stepBuy3:        isEn ? 'As long as transactions generate tax, buying never stops' : '只要有交易产生税收，买盘就不会中断',
    softBurn:        isEn ? 'Distributed Airdrop (Soft Burn)'  : '链上打散空投（软销毁）',
    security:        isEn ? 'Security & Permissions'    : '安全性与权限',
    sec1:            isEn ? 'Contract ownership burned to 0x...dEaD, tax rate permanently unmodifiable' : '合约所有权已打入 0x...dEaD 黑洞，税率永久无法调高',
    sec2:            isEn ? 'No blacklist function, asset transfers fully free'      : '无黑名单函数，无法封锁任何地址，资产完全自由',
    sec3:            isEn ? 'LP liquidity permanently locked, cannot be withdrawn'  : 'LP 流动性已永久锁仓，无法撤走',
    sec4:            isEn ? 'Buyback vault contract Owner is black hole, no withdrawal function' : '回购金库合约 Owner 为黑洞，且无任何提现函数',
    sec5:            isEn ? 'Fully open-sourced on BscScan, every line of code publicly auditable' : 'BscScan 全开源审计，每一行代码公开可查',
    riskNote:        isEn ? '⚠️ Risk Notice: $VIRUS has reduced human rug-pull risk to zero. Core risk is market consensus risk. All investments carry market volatility — participate rationally.' : '⚠️ 风险声明：$VIRUS 已将人为跑路风险降至零。项目核心风险为市场共识风险，任何投资均存在市场波动，请理性参与。',
    holderSection:   isEn ? 'Holder Address Data'       : '持币地址数据',
    holderDesc:      isEn ? 'Holder addresses exceed 27 million, ranking top-tier on BSC, derived from continuous algorithmic buyback and random address distribution.' : '持币地址数超过 2,700 万，位居 BSC 链顶级，源于算法回购与随机地址分发机制的持续运作。',
    holder1:         isEn ? '27M addresses is one of the most important metrics for CEX listing reviews' : '2,700 万地址是各大 CEX 上币评审最重要的流量指标之一',
    holder2:         isEn ? 'Chips in dead addresses permanently exit circulation — deflationary badges' : '死地址中的筹码永久退出流通，形成通缩勋章',
    holder3:         isEn ? 'Buyback keeps running — holder count will continue exponential growth' : '回购机制不停歇，持币地址数将持续指数级增长',
    tokenomics:      isEn ? 'Tokenomics'                : '经济模型',
    supply:          isEn ? 'Total Supply'              : '总供应量',
    supplyVal:       isEn ? '1 Billion VIRUS'           : '10 亿枚',
    lpLock:          isEn ? 'LP Lock'                   : 'LP 锁仓',
    lpLockVal:       isEn ? '99.9% Permanent'           : '99.9% 永久',
    buyTax:          isEn ? 'Buy Tax'                   : '买入税',
    buyTaxVal:       isEn ? '3% → Buyback Vault'        : '3% → 回购金库',
    sellTax:         isEn ? 'Sell Tax'                  : '卖出税',
    sellTaxVal:      isEn ? '3% → Buyback Vault'        : '3% → 回购金库',
    deflationLogic:  isEn ? 'As long as trading exists, tax flows into the vault continuously. Shrinking supply + sustained buying = mathematically inevitable price rise.' : '只要市场存在买卖交易，税收就会持续注入回购金库。流通盘减少 + 持续买盘 = 价格上涨的数学必然。',
    roadmap:         isEn ? 'Roadmap & Vision'          : '路线图与愿景',
    near:            isEn ? 'Near-term'                 : '近期目标',
    near1:           isEn ? 'Holder addresses exceed 50 million'    : '持币地址突破 5,000 万',
    near2:           isEn ? 'Listed on more CEX exchanges'          : '登陆更多中心化交易所（CEX）',
    near3:           isEn ? 'BSC chain #1 holder count ranking'     : 'BSC 链持币地址排名第一',
    mid:             isEn ? 'Mid-term'                  : '中期目标',
    mid1:            isEn ? 'Holder addresses exceed 100 million'   : '持币地址突破 1 亿',
    mid2:            isEn ? 'Price target $1 VIRUS'                 : '价格目标 $1 VIRUS',
    mid3:            isEn ? 'Iconic algorithmic asset on BSC chain' : '成为 BSC 链标志性算法资产',
    longTerm:        isEn ? 'Long-term Vision'          : '长期愿景',
    longDesc:        isEn ? "$VIRUS's ultimate goal is to become the largest algorithmic consensus asset on BSC chain. When holder scale reaches hundreds of millions, $VIRUS will evolve into one of Web3's foundational infrastructures." : '$VIRUS 的终极目标是成为 BSC 链上最大的算法共识资产，当持币地址规模达到亿级，$VIRUS 将演变为 Web3 世界的基础设施之一。',
    howTo:           isEn ? 'How to Participate'        : '如何参与',
    wallets:         isEn ? 'Supported wallets:'        : '支持所有主流 BSC 钱包：',
    wallet1:         isEn ? 'TP Wallet, OKX Web3, Binance Web3 Wallet' : 'TP钱包、欧易Web3钱包、币安Web3钱包',
    wallet2:         isEn ? 'Bitget Wallet, MetaMask, Gate Web3'        : 'Bitget钱包、MetaMask（小狐狸）、芝麻开门Web3',
    wallet3:         isEn ? 'PancakeSwap V2 (official locked pool)'     : 'PancakeSwap V2（官方锁仓池所在地）',
    caLabel:         isEn ? 'Contract Address (CA)'     : '合约地址（CA）',
    closing1:        isEn ? '$VIRUS is not a project. It is a piece of code, a set of mathematics, a consensus.' : '$VIRUS 不是一个项目，它是一段代码，一套数学，一个共识。',
    closing2:        isEn ? "Don't look at what the team says. Look at what the code does." : '不看项目方说了什么，只看代码写了什么。',
    codeVerify:      isEn ? 'On-Chain Code Verification' : '链上代码验证',
    codeVerifyDesc:  isEn ? 'All code is fully open-sourced on BscScan. Anyone can audit every line of contract logic at any time. Code is truth — no need to trust the team.' : '所有代码均在 BscScan 全开源，任何人可随时查阅每一行合约逻辑。代码即真理，无需信任项目方。',
    mainContract:    isEn ? 'VIRUS Main Contract Code'  : 'VIRUS 主合约代码',
    buybackWallet:   isEn ? 'Buyback Wallet'            : '回购钱包',
    airdropRecord:   isEn ? 'Airdrop Distribution Records' : '空投发放记录',
    airdropSub:      isEn ? 'View real-time batch airdrop details' : '实时查看每一笔批量空投明细',
    buyNow:          isEn ? 'Buy Now'                   : '立即购买',
    buyNowSub:       isEn ? 'PancakeSwap V2 Official Locked Pool' : 'PancakeSwap V2 官方锁仓池',
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl z-50 overflow-y-auto
                       bg-gradient-to-b from-surface-body via-surface-alt to-surface-body
                       border-l border-line-default"
          >
            {/* 顶部栏 */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4
                            bg-surface-body/80 backdrop-blur-md border-b border-line-default">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                <span className="font-display text-lg text-content-primary">{wp.title}</span>
                <span className="text-xs text-content-muted bg-brand-primary/10 border border-brand-primary/20 px-2 py-0.5 rounded-full">
                  {wp.version}
                </span>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg text-content-muted hover:text-content-primary hover:bg-surface-card transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-8 space-y-8">

              {/* 封面 */}
              <div className="text-center space-y-3 py-4">
                <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                  className="text-4xl font-display bg-gradient-to-r from-brand-light to-brand-dark bg-clip-text text-transparent">
                  $VIRUS
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="text-content-secondary text-base">
                  {wp.subtitle}
                </motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                  className="text-xs text-content-muted font-mono">
                  {wp.contract}
                </motion.p>
              </div>

              {/* 核心参数 */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <CardToken className="p-5" hover={false}>
                  <SectionTitle icon={Coins} title={txt.coreParams} />
                  <ParamRow label={txt.chain}      value={txt.chainVal} />
                  <ParamRow label={txt.tax}        value={txt.taxVal} />
                  <ParamRow label={txt.lpStatus}   value={txt.lpVal} />
                  <ParamRow label={txt.permission} value={txt.permissionVal} />
                  <ParamRow label={txt.holders}    value={txt.holdersVal} />
                  <ParamRow label={txt.slippage}   value={txt.slippageVal} />
                </CardToken>
              </motion.div>

              {/* 项目概述 */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <CardToken className="p-5" hover={false}>
                  <SectionTitle icon={Globe} title={txt.overview} />
                  <p className="text-sm text-content-secondary leading-relaxed mb-3">{wp.overview}</p>
                  <p className="text-sm text-content-secondary leading-relaxed">{wp.concept}</p>
                </CardToken>
              </motion.div>

              {/* 核心机制 */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <CardToken className="p-5" hover={false}>
                  <SectionTitle icon={RefreshCw} title={txt.mechanism} />
                  <h3 className="text-sm font-bold text-content-primary mb-2">{txt.buybackTitle}</h3>
                  <p className="text-sm text-content-secondary leading-relaxed mb-4">{txt.buybackDesc}</p>
                  <h3 className="text-sm font-bold text-content-primary mb-2">{txt.stepBuy}</h3>
                  <BulletItem text={txt.stepBuy1} />
                  <BulletItem text={txt.stepBuy2} />
                  <BulletItem text={txt.stepBuy3} />
                  <div className="mt-4">
                    <h3 className="text-sm font-bold text-content-primary mb-2">{txt.softBurn}</h3>
                    <BulletItem text={wp.airdropDesc1} />
                    <BulletItem text={wp.airdropDesc2} />
                    <BulletItem text={wp.airdropDesc3} />
                  </div>
                </CardToken>
              </motion.div>

              {/* 安全性 */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <CardToken className="p-5" hover={false}>
                  <SectionTitle icon={Shield} title={txt.security} />
                  <BulletItem text={txt.sec1} />
                  <BulletItem text={txt.sec2} />
                  <BulletItem text={txt.sec3} />
                  <BulletItem text={txt.sec4} />
                  <BulletItem text={txt.sec5} />
                  <div className="mt-4 p-3 bg-brand-primary/5 border border-brand-primary/20 rounded-lg">
                    <p className="text-xs text-content-muted leading-relaxed">{txt.riskNote}</p>
                  </div>
                </CardToken>
              </motion.div>

              {/* 持币地址 */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <CardToken className="p-5" hover={false}>
                  <SectionTitle icon={Users} title={txt.holderSection} />
                  <p className="text-sm text-content-secondary leading-relaxed mb-3">{txt.holderDesc}</p>
                  <BulletItem text={txt.holder1} />
                  <BulletItem text={txt.holder2} />
                  <BulletItem text={txt.holder3} />
                </CardToken>
              </motion.div>

              {/* 经济模型 */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <CardToken className="p-5" hover={false}>
                  <SectionTitle icon={TrendingUp} title={txt.tokenomics} />
                  <ParamRow label={txt.supply}  value={txt.supplyVal} />
                  <ParamRow label={txt.lpLock}  value={txt.lpLockVal} />
                  <ParamRow label={txt.buyTax}  value={txt.buyTaxVal} />
                  <ParamRow label={txt.sellTax} value={txt.sellTaxVal} />
                  <p className="text-sm text-content-secondary leading-relaxed mt-4">{txt.deflationLogic}</p>
                </CardToken>
              </motion.div>

              {/* 路线图 */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <CardToken className="p-5" hover={false}>
                  <SectionTitle icon={Zap} title={txt.roadmap} />
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-brand-primary" />
                        <span className="text-sm font-bold text-content-primary">{txt.near}</span>
                      </div>
                      <BulletItem text={txt.near1} />
                      <BulletItem text={txt.near2} />
                      <BulletItem text={txt.near3} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-accent-green" />
                        <span className="text-sm font-bold text-content-primary">{txt.mid}</span>
                      </div>
                      <BulletItem text={txt.mid1} />
                      <BulletItem text={txt.mid2} />
                      <BulletItem text={txt.mid3} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-accent-yellow" />
                        <span className="text-sm font-bold text-content-primary">{txt.longTerm}</span>
                      </div>
                      <p className="text-sm text-content-secondary leading-relaxed pl-4">{txt.longDesc}</p>
                    </div>
                  </div>
                </CardToken>
              </motion.div>

              {/* 如何参与 */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                <CardToken className="p-5" hover={false}>
                  <SectionTitle icon={Lock} title={txt.howTo} />
                  <p className="text-sm text-content-secondary mb-3">{txt.wallets}</p>
                  <BulletItem text={txt.wallet1} />
                  <BulletItem text={txt.wallet2} />
                  <BulletItem text={txt.wallet3} />
                  <div className="mt-4 p-3 bg-surface-card rounded-lg border border-line-default">
                    <p className="text-xs text-content-muted mb-1">{txt.caLabel}</p>
                    <p className="text-xs font-mono text-brand-primary break-all">{wp.contract}</p>
                  </div>
                </CardToken>
              </motion.div>

              {/* 结语 */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="text-center py-6 space-y-3">
                <p className="text-content-muted text-sm">{txt.closing1}</p>
                <p className="text-brand-primary font-display text-lg">{txt.closing2}</p>
                <p className="text-content-muted text-xs">Twitter: @virus_cto</p>
              </motion.div>

              {/* 链上代码验证 */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
                <CardToken className="p-5" hover={false}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-brand-primary/10 border border-brand-primary/30 rounded-lg">
                      <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-display text-content-primary">{txt.codeVerify}</h2>
                  </div>
                  <p className="text-sm text-content-secondary leading-relaxed mb-4">{txt.codeVerifyDesc}</p>
                  <div className="space-y-3">
                    <LinkRow
                      href="https://bscscan.com/token/0xa1ed61902f13e162305f59e1b2475e269e647777#code"
                      title={txt.mainContract}
                      sub="0xa1ed...7777"
                      label="BscScan"
                    />
                    <LinkRow
                      href="https://bscscan.com/address/0x96D973C3F99486D427bA0117715F2355f02208D9"
                      title={txt.buybackWallet}
                      sub="0x96D9...08D9"
                      label="BscScan"
                    />
                    <LinkRow
                      href="https://bscscan.com/token/0xa1ed61902f13e162305f59e1b2475e269e647777?a=0x96D973C3F99486D427bA0117715F2355f02208D9"
                      title={txt.airdropRecord}
                      sub={txt.airdropSub}
                      label="BscScan"
                    />
                    <LinkRow
                      href="https://pancakeswap.finance/swap?outputCurrency=0xa1ed61902f13e162305f59e1b2475e269e647777"
                      title={txt.buyNow}
                      sub={txt.buyNowSub}
                      label="PancakeSwap"
                    />
                  </div>
                </CardToken>
              </motion.div>

              <div className="h-6" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
