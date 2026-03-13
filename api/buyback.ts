// api/buyback.ts
// VIRUS 总回购量（手动更新，每周从 GMGN 查询最新数据后修改 total 的值）
// 最后更新：2026-03-12，数据来源：GMGN

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // CDN 缓存 24 小时
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600');

  // ⬇️ 每次更新只需修改这个数字（单位：枚 VIRUS）
  return res.status(200).json({ total: 293400000 });
}
