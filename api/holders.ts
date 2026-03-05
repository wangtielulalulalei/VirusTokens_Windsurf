import type { VercelRequest, VercelResponse } from '@vercel/node';

const CONTRACT = '0xa1ed61902f13e162305f59e1b2475e269e647777';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 允许前端跨域访问
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=300'); // Vercel 缓存5分钟

  try {
    // 抓取 BSCScan token 页面
    const response = await fetch(
      `https://bscscan.com/token/${CONTRACT}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      }
    );

    const html = await response.text();

    // 从页面 HTML 中提取持币地址数
    const match = html.match(/(\d[\d,]+)\s*addresses/i);
    const holders = match ? parseInt(match[1].replace(/,/g, '')) : null;

    if (holders === null) {
      return res.status(404).json({ error: 'holders not found' });
    }

    return res.status(200).json({ holders });
  } catch (err) {
    return res.status(500).json({ error: 'failed to fetch holders' });
  }
}
