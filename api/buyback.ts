// api/buyback.ts
// 计算 VIRUS 总回购量
// 调用 Moralis 翻页累加回购钱包转出的 VIRUS 数量
// CDN 缓存 24 小时，每天自动更新一次

import type { VercelRequest, VercelResponse } from '@vercel/node';

const CONTRACT     = '0xa1ed61902f13e162305f59e1b2475e269e647777';
const WALLET       = '0x96D973C3F99486D427bA0117715F2355f02208D9';
const MORALIS_BASE = 'https://deep-index.moralis.io/api/v2.2';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const apiKey = process.env.MORALIS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'MORALIS_API_KEY not set' });
  }

  // CDN 缓存 24 小时，第一个访客触发计算，后续全部读缓存
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600');

  try {
    let totalRaw = BigInt(0);
    let cursor: string | null = null;
    let page = 0;
    const MAX_PAGES = 50; // 最多翻 50 页（5000条），足够覆盖 3888 条历史数据

    do {
      const url = new URL(`${MORALIS_BASE}/erc20/${CONTRACT}/transfers`);
      url.searchParams.set('chain', 'bsc');
      url.searchParams.set('from_address', WALLET);
      url.searchParams.set('limit', '100');
      if (cursor) url.searchParams.set('cursor', cursor);

      const res2 = await fetch(url.toString(), {
        headers: { 'X-API-Key': apiKey, Accept: 'application/json' },
      });

      if (!res2.ok) throw new Error(`Moralis ${res2.status}: ${await res2.text()}`);

      const data = await res2.json();
      const batch: Array<{ value: string }> = data.result ?? [];

      for (const tx of batch) {
        totalRaw += BigInt(tx.value);
      }

      cursor = data.cursor ?? null;
      page++;
    } while (cursor && page < MAX_PAGES);

    const total = Number(totalRaw) / 1e18;

    return res.status(200).json({ total });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('buyback error:', msg);
    return res.status(500).json({ error: msg });
  }
}
