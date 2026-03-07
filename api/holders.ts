// api/holders.ts
// 爬取 BSCScan 页面获取 VIRUS 持币地址数
// 不需要任何 API Key，CDN 缓存 24 小时

import type { VercelRequest, VercelResponse } from '@vercel/node';

const CONTRACT = '0xa1ed61902f13e162305f59e1b2475e269e647777';
const FALLBACK = 27753355; // 爬取失败时的兜底值

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // CDN 缓存 24 小时，第一个访客触发爬取，后续全读缓存
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600');

  try {
    const response = await fetch(
      `https://bscscan.com/token/${CONTRACT}`,
      {
        headers: {
          // 伪装成普通浏览器，避免被拦截
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
      }
    );

    if (!response.ok) throw new Error(`BSCScan returned ${response.status}`);

    const html = await response.text();

    // BSCScan 页面上 Holders 数字的格式：27,764,773
    // 匹配 "Holders" 附近的数字
    const match =
      html.match(/Holders[^<]*<[^>]+>\s*([\d,]+)\s*</) ||
      html.match(/token-holders[^>]*>\s*([\d,]+)/) ||
      html.match(/"holderCount"[^:]*:\s*"?([\d,]+)"?/);

    if (!match) throw new Error('Holder count pattern not found in HTML');

    const holders = parseInt(match[1].replace(/,/g, ''), 10);
    if (isNaN(holders) || holders < 1000) throw new Error(`Parsed value looks wrong: ${match[1]}`);

    return res.status(200).json({ holders, source: 'bscscan' });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('holders scrape failed:', msg);
    // 降级返回写死值，不会显示 0
    return res.status(200).json({ holders: FALLBACK, source: 'fallback', warning: msg });
  }
}
