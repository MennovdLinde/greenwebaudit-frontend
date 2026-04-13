import { useState, useEffect, useCallback } from 'react';
import { URLInput } from './components/URLInput';
import { ResultsDashboard } from './components/ResultsDashboard';
import { AuditHistory } from './components/AuditHistory';
import './App.css';

interface AuditResult {
  url: string;
  carbonScore?: number;
  performanceScore?: number;
  recommendations?: string[];
}

interface HistoryEntry {
  id: number;
  url: string;
  carbon_score: number;
  performance_score: number;
  page_size: number;
  created_at: string;
}

function App() {
  const [result, setResult]           = useState<AuditResult | null>(null);
  const [isLoading, setIsLoading]     = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const [history, setHistory]         = useState<HistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/audits`);
      if (res.ok) setHistory(await res.json());
    } catch {
      // history is non-critical, fail silently
    } finally {
      setHistoryLoading(false);
    }
  }, [API_URL]);

  useEffect(() => { fetchHistory(); }, [fetchHistory]);

  const handleAudit = async (url: string) => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Audit failed');
      }

      const data = await response.json();
      setResult({
        url: data.url,
        carbonScore: data.carbonScore,
        performanceScore: data.performanceScore,
        recommendations: data.recommendations,
      });

      // Refresh history after a new audit
      fetchHistory();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-badge">🌿 Carbon Auditor</div>
        <h1>How green is your <span>website?</span></h1>
        <p>Measure the carbon footprint and performance of any website instantly.</p>
      </header>

      <main className="main">
        <URLInput onSubmit={handleAudit} isLoading={isLoading} />

        {error && (
          <div className="error-message">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <ResultsDashboard result={result} isLoading={isLoading} />
      </main>

      <AuditHistory
        entries={history}
        isLoading={historyLoading}
        onSelect={handleAudit}
      />

      <footer className="footer">
        <span>🌍</span>
        <span>Building a greener web, one audit at a time.</span>
      </footer>
    </div>
  );
}

export default App;
