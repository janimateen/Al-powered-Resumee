const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const STORE = path.join(__dirname, '..', '..', 'data', 'store.json');

function readStore() {
  try {
    const raw = fs.readFileSync(STORE, 'utf8');
    return JSON.parse(raw || '{}');
  } catch (e) {
    return {};
  }
}

function writeStore(obj) {
  fs.writeFileSync(STORE, JSON.stringify(obj, null, 2));
}

// GET /api/resumes - list all (simple, no auth)
router.get('/', (req, res) => {
  const store = readStore();
  res.json(store.resumes || []);
});

// POST /api/resumes - create resume { title, content }
router.post('/', (req, res) => {
  const { title = 'Untitled', content = '' } = req.body || {};
  const store = readStore();
  store.resumes = store.resumes || [];
  const id = `r_${Date.now()}`;
  const item = { id, title, content, createdAt: new Date().toISOString() };
  store.resumes.push(item);
  writeStore(store);
  res.status(201).json(item);
});

module.exports = router;
