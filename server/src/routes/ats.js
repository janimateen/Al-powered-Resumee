const express = require('express');
const router = express.Router();
const { callHuggingFace } = require('../lib/hf');

// Simple keyword extractor heuristic
function extractKeywords(text, limit = 10) {
  if (!text) return [];
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3 && !['that','this','with','have','will'].includes(w));
  const freq = {};
  for (const w of words) freq[w] = (freq[w] || 0) + 1;
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(e => e[0]);
}

async function extractKeywordsWithHF(jobDescription) {
  const model = process.env.HF_MODEL || 'gpt2';
  const apiKey = process.env.HF_API_KEY;
  if (!apiKey) return null;
  try {
    const prompt = `Extract the top 12 keyword phrases from the following job description as a JSON array of strings.\n\nJob description:\n${jobDescription}`;
    const payload = { inputs: prompt };
    const resp = await callHuggingFace(model, payload, apiKey);
    // resp may be text or object; try to find a JSON array in string
    if (!resp) return null;
    if (typeof resp === 'string') {
      const match = resp.match(/\[.*\]/s);
      if (match) {
        try { return JSON.parse(match[0]); } catch (e) { return null; }
      }
      return null;
    }
    // some models return an array/object directly
    if (Array.isArray(resp)) return resp.slice(0, 12).map(String);
    if (resp && typeof resp === 'object') {
      // try to read text field
      const txt = resp[0] && resp[0].generated_text ? resp[0].generated_text : JSON.stringify(resp);
      const match = txt.match(/\[.*\]/s);
      if (match) {
        try { return JSON.parse(match[0]); } catch (e) { return null; }
      }
    }
    return null;
  } catch (err) {
    return null;
  }
}

// POST /api/ats/score
// body: { resumeText: string, jobDescription: string }
router.post('/score', async (req, res) => {
  const { resumeText = '', jobDescription = '' } = req.body || {};

  // Try HF keyword extraction first (optional)
  let keywords = await extractKeywordsWithHF(jobDescription);
  if (!keywords || !keywords.length) {
    keywords = extractKeywords(jobDescription, 12);
  }

  const present = keywords.filter(k => resumeText.toLowerCase().includes(k.toLowerCase()));
  const missing = keywords.filter(k => !present.includes(k));

  // formatting check (very basic)
  const formatIssues = [];
  if (!/experience/i.test(resumeText)) formatIssues.push('Missing "Experience" section');
  if (!/education/i.test(resumeText)) formatIssues.push('Missing "Education" section');

  const keywordScore = keywords.length ? Math.round((present.length / keywords.length) * 100) : 0;
  const formatPenalty = Math.min(formatIssues.length * 10, 30);
  const score = Math.max(0, keywordScore - formatPenalty);

  const suggestions = [];
  if (missing.length) suggestions.push(`Consider adding keywords: ${missing.join(', ')}`);
  if (formatIssues.length) suggestions.push(...formatIssues.map(i => `Fix formatting: ${i}`));
  if (!resumeText.trim()) suggestions.push('Resume appears empty — add summary and experience bullets');

  return res.json({
    score,
    keywords,
    presentKeywords: present,
    missingKeywords: missing,
    formatIssues,
    suggestions,
  });
});

module.exports = router;
