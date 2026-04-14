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
    const contractAddress = '0xa1ed61902f13e162305f59e1b2475e269e647777';

    // ── 写死的静态数据：每周手动更新一次 ──
    // 持币地址数来源：BSCScan，回购量来源：GMGN
    // 最后更新：2026-03-12
    const fetchStaticData = async () => {
      setTokenData(prev => ({
        ...prev,
        holderCount: 30405944,   // ⬅️ 每周从 BSCScan 更新
        buybackAmount: 305800000, // ⬅️ 每周从 GMGN 更新
      }));
    };

    // ── 每 5 分钟刷新一次：只刷价格和市值（DexScreener，免费无限制）──
    const fetchPrice = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`,
          { headers: { 'Accept': 'application/json' } }
        );
        let data = response.ok ? await response.json() : null;

        // 备用：按 symbol 搜索
        if (!data?.pairs?.length) {
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
            if (matchingPairs?.length > 0) data = { pairs: matchingPairs };
          }
        }

        if (data?.pairs?.length > 0) {
          const pairs = data.pairs as DexScreenerPair[];
          const mainPair = pairs.reduce((best: DexScreenerPair, current: DexScreenerPair) => {
            return (current.liquidity?.usd || 0) > (best.liquidity?.usd || 0) ? current : best;
          });
          setTokenData(prev => ({
            ...prev,
            price: parseFloat(mainPair.priceUsd) || 0,
            marketCap: mainPair.fdv || 0,
            volume24h: mainPair.volume?.h24 || 0,
            liquidity: mainPair.liquidity?.usd || 0,
          }));
        }
        setInitialized(true);
      } catch (err) {
        console.warn('DexScreener 失败:', err);
      } finally {
        setLoading(false);
      }
    };

    // 页面加载时各请求一次
    fetchStaticData();
    fetchPrice();

    // 只有价格每 5 分钟刷新，回购量和持币地址不再轮询
    const interval = setInterval(fetchPrice, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // 数字格式化：M 带两位小数，如 2.15M / 27.75M
  const formatNumber = (num?: number, decimals = 2) => {
    if (num === undefined || num === null || num === 0) return '0';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(decimals);
  };

  // 价格格式化：小于 0.01 时显示 8 位小数
  const formatPrice = (price?: number) => {
    if (!price) return '$0.00';
    if (price < 0.01) return '$' + price.toFixed(8);
    return '$' + formatNumber(price);
  };

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

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
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
              <CardToken className="p-4 sm:p-5 lg:p-6">
                <div className={`inline-flex p-2 sm:p-3 bg-gradient-to-br ${stat.gradient} rounded-lg sm:rounded-xl mb-3 sm:mb-4`}>
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-content-primary" />
                </div>
                <div className="text-xs sm:text-sm text-content-secondary mb-1 sm:mb-2">{stat.label}</div>
                <div className="flex items-baseline gap-1 sm:gap-2">
                  <div className="text-lg sm:text-xl lg:text-2xl font-display">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-content-muted">{stat.unit}</div>
                </div>
              </CardToken>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
