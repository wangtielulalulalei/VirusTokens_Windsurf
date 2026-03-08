import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface Translations {
  zh: {
    nav: {
      home: string;
      mechanisms: string;
      roadmap: string;
      community: string;
    };
    header: {
      joinCommunity: string;
      telegram: string;
      x: string;
      buyToken: string;
      qqCommunity: string;
    };
    hero: {
      network: string;
      title: string;
      subtitle: string;
      subtitleText: string;
      buyToken: string;
      whitepaper: string;
      stats: {
        exchanges: string;
        holders: string;
        network: string;
        totalSupply: string;
      };
    };
    stats: {
      title: string;
      subtitle: string;
      price: string;
      marketCap: string;
      volume24h: string;
      holders: string;
      estimated: string;
      totalSupply: string;
      tokens: string;
      holderCount: string;
      units: string;
      exchanges: string;
      cex: string;
      tax: string;
      buyback: string;
    };
    features: {
      title: string;
      subtitle: string;
      whyChoose: string;
      whyChooseTitle: string;
      whyChooseDesc: string;
      features: {
        auto: {
          title: string;
          description: string;
        };
        secure: {
          title: string;
          description: string;
        };
        community: {
          title: string;
          description: string;
        };
        growth: {
          title: string;
          description: string;
        };
      };
      joinEcosystem: string;
    };
    mechanisms: {
      title: string;
      subtitle: string;
      mechanisms: {
        autoBurn: {
          title: string;
          description: string;
        };
        deflation: {
          title: string;
          description: string;
        };
        liquidity: {
          title: string;
          description: string;
        };
        community: {
          title: string;
          description: string;
        };
        volume: {
          title: string;
          description: string;
        };
        price: {
          title: string;
          description: string;
        };
        security: {
          title: string;
          description: string;
        };
        decentralization: {
          title: string;
          description: string;
        };
        governance: {
          title: string;
          description: string;
        };
        ecosystem: {
          title: string;
          description: string;
        };
      };
      valueProposition: string;
    };
    footer: {
      description: string;
      quickLinks: string;
      resources: string;
      social: string;
      about: string;
      whitepaper: string;
      roadmap: string;
      team: string;
      devDocs: string;
      smartContract: string;
      securityAudit: string;
      faq: string;
      privacy: string;
      terms: string;
      disclaimer: string;
      disclaimerText: string;
      rights: string;
    };
    whitepaper: {
      title: string;
      version: string;
      subtitle: string;
      contract: string;
      overview: string;
      concept: string;
      coreMechanisms: string;
      autoBuyback: string;
      autoBuybackDesc: string;
      airdrop: string;
      airdropDesc1: string;
      airdropDesc2: string;
      airdropDesc3: string;
      holderData: string;
      holderDataDesc: string;
      holderData1: string;
      holderData2: string;
      holderData3: string;
      tokenomics: string;
      totalSupply: string;
      totalSupplyValue: string;
      buybackTax: string;
      buybackTaxValue: string;
      liquidity: string;
      liquidityValue: string;
      marketing: string;
      marketingValue: string;
    };
  };
  en: {
    nav: {
      home: string;
      mechanisms: string;
      roadmap: string;
      community: string;
    };
    header: {
      joinCommunity: string;
      telegram: string;
      x: string;
      buyToken: string;
      qqCommunity: string;
    };
    hero: {
      network: string;
      title: string;
      subtitle: string;
      subtitleText: string;
      buyToken: string;
      whitepaper: string;
      stats: {
        exchanges: string;
        holders: string;
        network: string;
        totalSupply: string;
      };
    };
    stats: {
      title: string;
      subtitle: string;
      price: string;
      marketCap: string;
      volume24h: string;
      holders: string;
      estimated: string;
      totalSupply: string;
      tokens: string;
      holderCount: string;
      units: string;
      exchanges: string;
      cex: string;
      tax: string;
      buyback: string;
    };
    features: {
      title: string;
      subtitle: string;
      whyChoose: string;
      whyChooseTitle: string;
      whyChooseDesc: string;
      features: {
        auto: {
          title: string;
          description: string;
        };
        secure: {
          title: string;
          description: string;
        };
        community: {
          title: string;
          description: string;
        };
        growth: {
          title: string;
          description: string;
        };
      };
      joinEcosystem: string;
    };
    mechanisms: {
      title: string;
      subtitle: string;
      mechanisms: {
        autoBurn: {
          title: string;
          description: string;
        };
        deflation: {
          title: string;
          description: string;
        };
        liquidity: {
          title: string;
          description: string;
        };
        community: {
          title: string;
          description: string;
        };
        volume: {
          title: string;
          description: string;
        };
        price: {
          title: string;
          description: string;
        };
        security: {
          title: string;
          description: string;
        };
        decentralization: {
          title: string;
          description: string;
        };
        governance: {
          title: string;
          description: string;
        };
        ecosystem: {
          title: string;
          description: string;
        };
      };
      valueProposition: string;
    };
    footer: {
      description: string;
      quickLinks: string;
      resources: string;
      social: string;
      about: string;
      whitepaper: string;
      roadmap: string;
      team: string;
      devDocs: string;
      smartContract: string;
      securityAudit: string;
      faq: string;
      privacy: string;
      terms: string;
      disclaimer: string;
      disclaimerText: string;
      rights: string;
    };
    whitepaper: {
      title: string;
      version: string;
      subtitle: string;
      contract: string;
      overview: string;
      concept: string;
      coreMechanisms: string;
      autoBuyback: string;
      autoBuybackDesc: string;
      airdrop: string;
      airdropDesc1: string;
      airdropDesc2: string;
      airdropDesc3: string;
      holderData: string;
      holderDataDesc: string;
      holderData1: string;
      holderData2: string;
      holderData3: string;
      tokenomics: string;
      totalSupply: string;
      totalSupplyValue: string;
      buybackTax: string;
      buybackTaxValue: string;
      liquidity: string;
      liquidityValue: string;
      marketing: string;
      marketingValue: string;
    };
  };
}

const translations: Translations = {
  zh: {
    nav: {
      home: '首页',
      mechanisms: '代币机制',
      roadmap: '路线图',
      community: '社区',
    },
    header: {
      joinCommunity: '加入社区',
      telegram: 'Telegram',
      x: 'X (Twitter)',
      buyToken: '购买代币',
      qqCommunity: 'QQ社群',
    },
    hero: {
      network: 'BSC (BEP-20) 网络',
      title: 'VIRUS',
      subtitle: '代币',
      subtitleText: '区块链史上持币人数最多的加密货币，以独特的通缩机制和社区治理模式，创造真正的去中心化价值。',
      buyToken: '购买代币',
      whitepaper: '白皮书',
      stats: {
        exchanges: '上线交易所',
        holders: '持币地址数',
        network: '网络',
        totalSupply: '总发行数量',
      },
    },
    whitepaper: {
      title: 'VIRUS TOKEN',
      version: '白皮书 v1.0',
      subtitle: '区块链持币人最多的代币',
      contract: '0xa1ed61902f13e162305f59e1b2475e269e647777',
      overview: 'VIRUS Token（$VIRUS）是部署在 BNB Smart Chain 上的去中心化算法通缩资产。项目无项目方抽水，无中心化控制，所有核心规则由智能合约自动执行，合约权限已永久丢弃，任何人无法修改。',
      concept: '核心理念：相信代码胜过相信人，用数学通缩机制取代人为干预，打造真正公平、透明、无跑路风险的 Web3 资产。',
      coreMechanisms: '核心机制',
      autoBuyback: '自动回购与销毁',
      autoBuybackDesc: '每笔交易自动抽取5%用于回购市面代币并立即销毁，形成持续通缩压力，推高币价。',
      airdrop: '链上打散空投（软销毁）',
      airdropDesc1: '数千万随机地址每个仅持有极少量代币，无法被归集',
      airdropDesc2: '实现间接永久销毁，持续压缩流通盘',
      airdropDesc3: '最大化链上交互，提升各大榜单排名与热度',
      holderData: '持币地址数据',
      holderDataDesc: '持币地址数超过 2,700 万，位居 BSC 链顶级，源于算法回购与随机地址分发机制的持续运作。',
      holderData1: '2,700 万地址是各大 CEX 上币评审最重要的流量指标之一',
      holderData2: '死地址中的筹码永久退出流通，形成通缩勋章',
      holderData3: '回购机制不停歇，持币地址数将持续指数级增长',
      tokenomics: '代币经济',
      totalSupply: '总供应量',
      totalSupplyValue: '1,000,000,000,000',
      buybackTax: '回购税',
      buybackTaxValue: '5%',
      liquidity: '流动性',
      liquidityValue: '100%',
      marketing: '营销',
      marketingValue: '0%',
    },
    stats: {
      title: '核心数据',
      subtitle: 'VIRUS 代币的关键统计信息',
      price: '当前价格',
      marketCap: '市值',
      volume24h: '24h交易量',
      holders: '持币地址数',
      estimated: ' (估算)',
      totalSupply: '总供应量',
      tokens: '枚',
      holderCount: '持币地址数',
      units: '个',
      exchanges: '上线交易所',
      cex: '个 CEX',
      tax: '交易税费',
      buyback: '总回购量',
    },
    features: {
      title: '购买 VIRUS 的四大理由',
      subtitle: 'VIRUS 代币的独特优势',
      whyChoose: '购买 VIRUS 的四大理由',
      whyChooseTitle: 'VIRUS',
      whyChooseDesc: '基于创新技术和强大社区，构建最具价值的加密货币生态系统',
      features: {
        auto: {
          title: '持币地址持续增长，共识不断扩大',
          description: '项目目标是成为区块链史上持币地址最多的代币，通过独特的病毒式传播机制，持币人数持续扩大，社区共识不断积累。',
        },
        secure: {
          title: '诞生于BSC链升级节点，先发优势突出',
          description: 'VIRUS诞生于币安链Maxwell硬分叉升级后，率先占据生态核心位置，享受低gas费带来的技术红利，早期布局机遇稀缺。',
        },
        community: {
          title: '流通量只减不增，长期持有逻辑清晰',
          description: '无论市场涨跌，销毁机制始终在运转，流通量持续减少，底部支撑逐步抬高，具备长期持有的价值基础。',
        },
        growth: {
          title: '社区持续运营，扩张动力充足',
          description: '项目拥有活跃的社区运营团队，持续推动持币地址增长，生态建设稳步落地，不依赖短期炒作，具备长期持续扩张的执行力。',
        },
      },
      joinEcosystem: '立即加入 VIRUS 生态系统',
    },
    mechanisms: {
      title: 'VIRUS独特代币机制',
      subtitle: '三大核心机制构建长期价值',
      mechanisms: {
        autoBurn: {
          title: '交易销毁机制',
          description: '每笔交易计提3%自动回购并销毁，流通量持续减少，形成长效通缩。',
        },
        deflation: {
          title: 'BSC链专属资产',
          description: '依托币安链，转账快、手续费极低，无同类项目分流，生态资金高度聚焦。',
        },
        liquidity: {
          title: '持续生态落地',
          description: '每次升级与上线均为实质利好，持续推动价值上涨，非短期炒作。',
        },
        community: {
          title: '社区扩张',
          description: '随着持币地址数增加，代币的社区规模会扩大，从而提升其影响力与传播力。',
        },
        volume: {
          title: '交易活跃',
          description: '随着持币地址数增加，代币的交易量会提升，从而提升其市场活跃度与流动性。',
        },
        price: {
          title: '价格上涨',
          description: '随着持币地址数增加，代币的价格会上涨，从而提升其投资回报率与吸引力。',
        },
        security: {
          title: '安全提升',
          description: '随着持币地址数增加，代币的安全性会提升，从而降低其被攻击的风险。',
        },
        decentralization: {
          title: '去中心化',
          description: '随着持币地址数增加，代币的去中心化程度会提升，从而增强其抗审查能力。',
        },
        governance: {
          title: '治理分散',
          description: '随着持币地址数增加，代币的治理权会更加分散，从而提升其社区自治水平。',
        },
        ecosystem: {
          title: '生态丰富',
          description: '随着持币地址数增加，代币的生态系统会更加丰富，从而提升其应用场景与价值。',
        },
      },
      valueProposition: '持币地址数越多，代币价值越高',
    },
    footer: {
      description: '区块链史上持币人数最多的加密货币',
      quickLinks: '快速链接',
      resources: '资源',
      social: '社交媒体',
      about: '关于我们',
      whitepaper: '白皮书',
      roadmap: '路线图',
      team: '团队',
      devDocs: '开发文档',
      smartContract: '智能合约',
      securityAudit: '安全审计',
      faq: '常见问题',
      privacy: '隐私政策',
      terms: '服务条款',
      disclaimer: '免责声明',
      disclaimerText: '⚠️ 加密货币投资存在风险，请在投资前做好充分的研究和风险评估。本网站内容不构成投资建议。',
      rights: '版权所有',
    },
  },
  en: {
    nav: {
      home: 'Home',
      mechanisms: 'Token Mechanics',
      roadmap: 'Roadmap',
      community: 'Community',
    },
    header: {
      joinCommunity: 'Join Community',
      telegram: 'Telegram',
      x: 'X (Twitter)',
      buyToken: 'Buy Token',
      qqCommunity: 'QQ Community',
    },
    hero: {
      network: 'BSC (BEP-20) Network',
      title: 'VIRUS',
      subtitle: 'Token',
      subtitleText: 'The cryptocurrency with the most holders in blockchain history, creating true decentralized value through unique deflationary mechanisms and community governance.',
      buyToken: 'Buy Token',
      whitepaper: 'Whitepaper',
      stats: {
        exchanges: 'Exchanges Listed',
        holders: 'Token Holders',
        network: 'Network',
        totalSupply: 'Total Supply',
      },
    },
    whitepaper: {
      title: 'VIRUS TOKEN',
      version: 'Whitepaper v1.0',
      subtitle: 'The Cryptocurrency with Most Holders',
      contract: '0xa1ed61902f13e162305f59e1b2475e269e647777',
      overview: 'VIRUS Token ($VIRUS) is a decentralized algorithmic deflationary asset deployed on BNB Smart Chain. The project has no team dumping, no centralized control, all core rules are automatically executed by smart contracts, contract permissions have been permanently renounced, and cannot be modified by anyone.',
      concept: 'Core philosophy: Trust code over people, using mathematical deflation mechanisms to replace human intervention, creating a truly fair, transparent, Web3 asset with no rug pull risk.',
      coreMechanisms: 'Core Mechanisms',
      autoBuyback: 'Automatic Buyback and Burn',
      autoBuybackDesc: '5% of each transaction is automatically used to buy back tokens from the market and immediately burn them, creating continuous deflationary pressure to push up the token price.',
      airdrop: 'On-Chain Distributed Airdrop (Soft Burn)',
      airdropDesc1: 'Tens of millions of random addresses each hold only very small amounts of tokens, making them impossible to aggregate',
      airdropDesc2: 'Achieves indirect permanent burning, continuously compressing circulating supply',
      airdropDesc3: 'Maximizes on-chain interaction, boosting rankings and visibility on major charts',
      holderData: 'Holder Address Data',
      holderDataDesc: 'Holder addresses exceed 27 million, ranking top-tier on BSC chain, derived from continuous operation of algorithmic buyback and random address distribution mechanisms.',
      holderData1: '27 million addresses is one of the most important traffic indicators for CEX token reviews',
      holderData2: 'Chips in dead addresses permanently exit circulation, forming deflationary badges',
      holderData3: 'Buyback mechanism operates continuously, holder count will continue exponential growth',
      tokenomics: 'Tokenomics',
      totalSupply: 'Total Supply',
      totalSupplyValue: '1,000,000,000,000',
      buybackTax: 'Buyback Tax',
      buybackTaxValue: '5%',
      liquidity: 'Liquidity',
      liquidityValue: '100%',
      marketing: 'Marketing',
      marketingValue: '0%',
    },
    stats: {
      title: 'Key Statistics',
      subtitle: 'Essential metrics for VIRUS token',
      price: 'Current Price',
      marketCap: 'Market Cap',
      volume24h: '24h Volume',
      holders: 'BSC Holder Count',
      estimated: ' (est.)',
      totalSupply: 'Total Supply',
      tokens: 'tokens',
      holderCount: 'Holder Count',
      units: 'units',
      exchanges: 'Exchanges Listed',
      cex: 'CEX',
      tax: 'Transaction Tax',
      buyback: 'Total Buyback',
    },
    features: {
      title: 'Four Reasons to Buy VIRUS',
      subtitle: 'Unique advantages of VIRUS token',
      whyChoose: 'Four Reasons to Buy VIRUS',
      whyChooseTitle: 'VIRUS',
      whyChooseDesc: 'Building the most valuable cryptocurrency ecosystem based on innovative technology and strong community',
      features: {
        auto: {
          title: 'Continuous Growth of Holder Addresses, Expanding Consensus',
          description: 'The project aims to become the token with the most holder addresses in blockchain history. Through a unique viral spread mechanism, the number of holders continues to expand, and community consensus continues to accumulate.',
        },
        secure: {
          title: 'Born at BSC Chain Upgrade Node, Prominent First-Mover Advantage',
          description: 'VIRUS was born after the Binance Chain Maxwell hard fork upgrade, taking the lead in occupying the core ecological position, enjoying the technical dividends brought by low gas fees, and scarce early layout opportunities.',
        },
        community: {
          title: 'Circulating Supply Only Decreases, Clear Logic for Long-term Holding',
          description: 'Regardless of market fluctuations, the burning mechanism is always operating, the circulating supply continues to decrease, the bottom support is gradually raised, and it has the value foundation for long-term holding.',
        },
        growth: {
          title: 'Continuous Community Operation, Sufficient Expansion Momentum',
          description: 'The project has an active community operation team, continuously promotes the growth of holder addresses, steadily implements ecological construction, does not rely on short-term speculation, and has the execution ability for long-term sustainable expansion.',
        },
      },
      joinEcosystem: 'Join the VIRUS Ecosystem Now',
    },
    mechanisms: {
      title: 'VIRUS Unique Token Mechanism',
      subtitle: 'Three Core Mechanisms Building Long-term Value',
      mechanisms: {
        autoBurn: {
          title: 'Transaction Burning Mechanism',
          description: '3% of each transaction is automatically used for buyback and burning, continuously reducing circulating supply and forming long-term deflation.',
        },
        deflation: {
          title: 'BSC Chain Exclusive Asset',
          description: 'Relying on Binance Chain, fast transfers and extremely low fees, no similar projects diverting funds, ecological funds highly focused.',
        },
        liquidity: {
          title: 'Continuous Ecological Implementation',
          description: 'Each upgrade and listing brings substantial benefits, continuously promoting value growth, not short-term speculation.',
        },
        community: {
          title: 'Community Expansion',
          description: 'As holder count increases, token community scale expands, enhancing influence and reach.',
        },
        volume: {
          title: 'Active Trading',
          description: 'As holder count increases, trading volume rises, boosting market activity and liquidity.',
        },
        price: {
          title: 'Price Appreciation',
          description: 'As holder count increases, token price rises, improving ROI and attractiveness.',
        },
        security: {
          title: 'Enhanced Security',
          description: 'As holder count increases, token security improves, reducing attack risks.',
        },
        decentralization: {
          title: 'Decentralization',
          description: 'As holder count increases, decentralization level rises, strengthening anti-censorship capabilities.',
        },
        governance: {
          title: 'Distributed Governance',
          description: 'As holder count increases, governance becomes more distributed, improving community autonomy.',
        },
        ecosystem: {
          title: 'Rich Ecosystem',
          description: 'As holder count increases, ecosystem becomes richer, expanding use cases and value.',
        },
      },
      valueProposition: 'More Holders = Higher Token Value',
    },
    footer: {
      description: 'The cryptocurrency with the most holders in blockchain history',
      quickLinks: 'Quick Links',
      resources: 'Resources',
      social: 'Social Media',
      about: 'About Us',
      whitepaper: 'Whitepaper',
      roadmap: 'Roadmap',
      team: 'Team',
      devDocs: 'Developer Docs',
      smartContract: 'Smart Contract',
      securityAudit: 'Security Audit',
      faq: 'FAQ',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      disclaimer: 'Disclaimer',
      disclaimerText: '⚠️ Cryptocurrency investment carries risks. Please conduct thorough research and risk assessment before investing. Website content does not constitute investment advice.',
      rights: 'All rights reserved',
    },
  },
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations[Language];
}>({
  language: 'zh',
  setLanguage: () => {},
  t: translations.zh,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
