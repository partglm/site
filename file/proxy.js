// proxyFetch.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // si Node <18

const backendHost = 'http://127.0.0.1:8081';

async function proxyFetchMiddleware(req, res, next) {
  if (!req.url.startsWith('/api')) {
    return next();
  }

  const backendUrl = backendHost + req.originalUrl;


  const newBody = JSON.stringify({
      //oneSessionID: req.cookies?.oneSessionID || null,
      ...req.body
    });
    
  try {
    const fetchOptions = {
      method: req.method,
      headers: { ...req.headers },
      body: newBody,
    };

    const backendRes = await fetch(backendUrl, fetchOptions);

    // Copier les headers sauf "transfer-encoding"
    backendRes.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'transfer-encoding') return;
      res.setHeader(key, value);
    });

    res.status(backendRes.status);
    const buffer = Buffer.from(await backendRes.arrayBuffer());
    res.send(buffer);
  } catch (err) {
    console.error('Proxy fetch error:', err);
    res.status(502).json({ error: 'Erreur de proxy via fetch' });
  }
}

module.exports = proxyFetchMiddleware;
