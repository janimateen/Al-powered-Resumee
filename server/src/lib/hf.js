const fetch = require('node-fetch');

async function callHuggingFace(model, payload, apiKey) {
  if (!apiKey) throw new Error('HF API key missing');
  const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
}

module.exports = { callHuggingFace };
