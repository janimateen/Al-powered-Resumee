const express = require('express');
const path = require('path');

// Load environment variables from repo root `.env` or `server/.env` if present
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const bodyParser = require('body-parser');
const cors = require('cors');

const atsRoute = require('./routes/ats');
const resumesRoute = require('./routes/resumes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

app.use('/api/ats', atsRoute);
app.use('/api/resumes', resumesRoute);

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
