import React, { useState } from 'react'

export default function ResumeEditor() {
  const [resumeText, setResumeText] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function score() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('http://localhost:4000/api/ats/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription: jobDesc }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="editor">
      <div className="column">
        <h2>Resume</h2>
        <textarea value={resumeText} onChange={e => setResumeText(e.target.value)} placeholder="Paste or write your resume here" />
      </div>
      <div className="column">
        <h2>Job Description</h2>
        <textarea value={jobDesc} onChange={e => setJobDesc(e.target.value)} placeholder="Paste job description" />
        <button onClick={score} disabled={loading}>{loading ? 'Scoring...' : 'Run ATS Score'}</button>
        {result && (
          <div className="result">
            {result.error ? (
              <div className="error">Error: {result.error}</div>
            ) : (
              <div>
                <h3>Score: {result.score}</h3>
                <div><strong>Present keywords:</strong> {result.presentKeywords?.join(', ') || '—'}</div>
                <div><strong>Missing keywords:</strong> {result.missingKeywords?.join(', ') || '—'}</div>
                <div><strong>Suggestions:</strong>
                  <ul>{(result.suggestions || []).map((s, i) => <li key={i}>{s}</li>)}</ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
