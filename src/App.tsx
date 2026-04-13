import { useState } from 'react';
import { URLInput } from './components/URLInput';
import { ResultsDashboard } from './components/ResultsDashboard';
import './App.css';

interface AuditResult {
  url: string;
  carbonScore?: number;
  performanceScore?: number;
  recommendations?: string[];
}

function App() {
  const [result, setResult] = useState<AuditResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const handleAudit = async (url: string) => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/api/audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error('Audit failed');
      const data = await response.json();

      setResult({
        url: data.url,
        carbonScore: data.carbonScore,
        performanceScore: data.performanceScore,
        recommendations: data.recommendations,
      });
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🌍 Green Web Audit</h1>
        <p>Measure the environmental impact of your website</p>
      </header>

      <main className="main">
        <URLInput onSubmit={handleAudit} isLoading={isLoading} />
        <ResultsDashboard result={result} isLoading={isLoading} />
      </main>

      <footer className="footer">
        <p>Building sustainable web tools.</p>
      </footer>
    </div>
  );
}

export default App;