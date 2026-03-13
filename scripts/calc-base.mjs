import https from 'https';

const CONTRACT = '0xa1ed61902f13e162305f59e1b2475e269e647777';
const WALLET   = '0x96D973C3F99486D427bA0117715F2355f02208D9';
const API_KEY  = process.env.MORALIS_API_KEY;

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'X-API-Key': API_KEY, 'Accept': 'application/json' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function main() {
  let total = BigInt(0);
  let cursor = null;
  let page = 0;

  console.log('开始计算历史回购总量...');

  do {
    let url = `https://deep-index.moralis.io/api/v2.2/erc20/${CONTRACT}/transfers?chain=bsc&from_address=${WALLET}&limit=100`;
    if (cursor) url += `&cursor=${cursor}`;

    const data = await get(url);
    const batch = data.result ?? [];

    for (const tx of batch) {
      total += BigInt(tx.value);
    }

    cursor = data.cursor ?? null;
    page++;
    console.log(`第 ${page} 页，本页 ${batch.length} 条，累计金额: ${Number(total) / 1e18}`);

  } while (cursor);

  const totalAmount = Number(total) / 1e18;
  console.log('\n=============================');
  console.log('历史回购总量:', totalAmount);
  console.log('=============================');
}

main().catch(console.error);
