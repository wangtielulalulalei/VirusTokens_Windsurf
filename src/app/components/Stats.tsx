import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, Coins, RefreshCw } from 'lucide-react';
import { CardToken } from './CardToken';
import { SectionHeader } from './SectionHeader';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// DexScreener 交易对数据结构
interface DexScreenerPair {
  priceUsd: string;
  fdv?: number;
  volume?: {
    h24?: number;
  };
  liquidity?: {
    usd?: number;
  };
  info?: {
    holders?: number;
  };
}

// 本组件内部使用的 token 数据结构
interface TokenData {
  price?: number;
  marketCap?: number;
  volume24h?: number;
  liquidity?: number;
  holderCount?: number;
  buybackAmount?: number;
}

export function Stats() {
  const { t } = useLanguage();
  const [tokenData, setTokenData] = useState<TokenData>({});
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        setLoading(true);

        const contractAddress = '0xa1ed61902f13e162305f59e1b2475e269e647777';
        // 回购钱包：每积累 0.1 BNB 自动触发买入 VIRUS 并空投
        const airdropWallet = '0x96D973C3F99486D427bA0117715F2355f02208D9';
        const moralisKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImY0ZWVjNWYzLWU5NjgtNDFmZi05OTZlLTk0MWUwZmUzY2IyMyIsIm9yZ0lkIjoiNTAzOTU0IiwidXNlcklkIjoiNTE4NTUyIiwidHlwZUlkIjoiY2JkZjhjMmYtYzhhMi00NmY5LThiZmMtMGE3YzY4NDhiZjMxIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NzI2MjY3NDQsImV4cCI6NDkyODM4Njc0NH0.ov52x1mm7sHBn4oapxxGPmONoNotehfOMds5pHbgyIQ';

        const [dexscreenerData, transferData, holderData] = await Promise.allSettled([

          // ── DexScreener：价格 / 市值 / 24h 交易量 / 流动性 / 持币地址数 ──
          (async () => {
            // 优先用合约地址直接查询
            try {
              const response = await fetch(
                `https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`,
                { headers: { 'Accept': 'application/json' } }
              );
              if (response.ok) {
                return await response.json();
              }
            } catch (err) {
              console.warn('DexScreener 直接查询失败:', err);
            }

            // 备用：按 symbol 搜索后过滤匹配合约地址的交易对
            try {
              const searchResponse = await fetch(
                `https://api.dexscreener.com/latest/dex/search?q=VIRUS`,
                { headers: { 'Accept': 'application/json' } }
              );
              if (searchResponse.ok) {
                const searchData = await searchResponse.json();
                const matchingPairs = searchData.pairs?.filter((pair: any) =>
                  pair.baseToken?.address?.toLowerCase() === contractAddress.toLowerCase() ||
                  pair.quoteToken?.address?.toLowerCase() === contractAddress.toLowerCase()
                );
                if (matchingPairs?.length > 0) {
                  return { pairs: matchingPairs };
                }
              }
            } catch (err) {
              console.warn('DexScreener 搜索失败:', err);
            }

            return null;
          })(),

          // ── Moralis：回购钱包的 VIRUS 转出记录（统计空投出去的总量）──
          // 使用翻页游标累加所有历史记录，不受单次 limit 限制
          (async () => {
            let total = 0;
            let cursor: string | null = null;
            let page = 0;
            const MAX_PAGES = 20; // 最多翻 20 页（每页100条）防止无限循环

            do {
              const url = new URL(
                `https://deep-index.moralis.io/api/v2.2/erc20/${contractAddress}/transfers`
              );
              url.searchParams.set('chain', 'bsc');
              url.searchParams.set('from_address', airdropWallet);
              url.searchParams.set('limit', '100');
              if (cursor) url.searchParams.set('cursor', cursor);

              const res = await fetch(url.toString(), {
                headers: { 'X-API-Key': moralisKey },
              }).then(r => r.json()).catch(() => null);

              if (!res?.result?.length) break;

              for (const tx of res.result) {
                total += parseFloat(tx.value || '0') / 1e18;
              }

              cursor = res.cursor ?? null;
              page++;
            } while (cursor && page < MAX_PAGES);

            return { total };
          })(),

          // ── /api/holders：从 BSCScan 获取持币地址总数（Vercel 后端代理）──
          fetch('/api/holders').then(r => r.json()).catch(() => null),
        ]);

        const newData: TokenData = {};

        // ── 处理 DexScreener 数据 ──
        if (dexscreenerData.status === 'fulfilled' && dexscreenerData.value?.pairs?.length > 0) {
          const pairs = dexscreenerData.value.pairs as DexScreenerPair[];

          // 取流动性最高的交易对作为主数据源
          const mainPair = pairs.reduce((best: DexScreenerPair, current: DexScreenerPair) => {
            return (current.liquidity?.usd || 0) > (best.liquidity?.usd || 0) ? current : best;
          });

          newData.price = parseFloat(mainPair.priceUsd) || 0;
          newData.marketCap = mainPair.fdv || 0;
          newData.volume24h = mainPair.volume?.h24 || 0;
          newData.liquidity = mainPair.liquidity?.usd || 0;
          newData.holderCount = (mainPair as any).info?.holders || 0;
        } else {
          console.warn('DexScreener 未返回有效交易对数据');
        }

        // ── 持币地址数（暂时静态，后续接入动态接口）──
        newData.holderCount = 27753355;

        // ── 处理回购空投总量 ──
        if (transferData.status === 'fulfilled' && transferData.value?.total !== undefined) {
          newData.buybackAmount = transferData.value.total;
        }

        setTokenData(newData);
        setInitialized(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenData();

    // 每 5 分钟自动刷新一次
    const interval = setInterval(fetchTokenData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // 数字格式化：自动添加 K / M / B 单位
  const formatNumber = (num?: number, decimals = 2) => {
    if (num === undefined || num === null || num === 0) return '0';
    if (num >= 1e9) return (num / 1e9).toFixed(decimals) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(decimals) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(decimals) + 'K';
    return num.toFixed(decimals);
  };

  // 价格格式化：小于 0.01 时显示 8 位小数
  const formatPrice = (price?: number) => {
    if (!price) return '$0.00';
    if (price < 0.01) return '$' + price.toFixed(8);
    return '$' + formatNumber(price);
  };

  // 加载中时显示占位符，加载完成后显示真实数据
  const getStats = () => {
    const placeholder = '...';

    return [
      {
        id: 'stat-price',
        icon: TrendingUp,
        label: t.stats.price,
        value: loading ? placeholder : formatPrice(tokenData.price),
        unit: '',
        gradient: 'from-brand-primary to-brand-darker',
      },
      {
        id: 'stat-marketcap',
        icon: Coins,
        label: t.stats.marketCap,
        value: loading ? placeholder : '$' + formatNumber(tokenData.marketCap),
        unit: 'USD',
        gradient: 'from-brand-dark to-accent-green',
      },
      {
        id: 'stat-holders',
        icon: Users,
        label: t.stats.holders || 'BSC持币地址数',
        value: loading ? placeholder : formatNumber(tokenData.holderCount, 0),
        unit: t.stats.units || '个',
        gradient: 'from-accent-green to-brand-dark',
      },
      {
        id: 'stat-buyback',
        icon: RefreshCw,
        label: t.stats.buyback || '总回购量',
        value: loading ? placeholder : formatNumber(tokenData.buybackAmount, 0),
        unit: 'VIRUS',
        gradient: 'from-accent-yellow to-brand-dark',
      },
    ];
  };

  const stats = getStats();

  return (
    <section className="relative px-4 py-16">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeader
          title={t.stats.title}
          subtitle={t.stats.subtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={initialized ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <CardToken className="p-6">
                <div className={`inline-flex p-3 bg-gradient-to-br ${stat.gradient} rounded-xl mb-4`}>
                  <stat.icon className="w-6 h-6 text-content-primary" />
                </div>
                <div className="text-sm text-content-secondary mb-2">{stat.label}</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-display">{stat.value}</div>
                  <div className="text-sm text-content-muted">{stat.unit}</div>
                </div>
              </CardToken>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
