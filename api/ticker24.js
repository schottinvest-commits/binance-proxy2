export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const target = 'https://api.binance.com/api/v3/ticker/24hr' + (new URL(req.url, `http://${req.headers.host}`)).search;
  try {
    const r = await fetch(target, { headers: { accept: 'application/json' } });
    const text = await r.text();
    res.status(r.status).setHeader('content-type', r.headers.get('content-type') || 'application/json').send(text);
  } catch (e) { res.status(500).json({ error: e.message }); }
}
