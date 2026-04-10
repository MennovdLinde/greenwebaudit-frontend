interface AuditResult {
  url: string;
  carbonScore?: number;
  performanceScore?: number;
  recommendations?: string[];
}

interface ResultsDashboardProps {
  result: AuditResult | null;
  isLoading: boolean;
}

export function ResultsDashboard({ result, isLoading }: ResultsDashboardProps) {
  if (isLoading) {
    return (
      <div className="dashboard">
        <div className="loading">
          <p>🔍 Analyzing website...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="dashboard empty">
        <p>No audit results yet. Enter a URL above to get started.</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="result-header">
        <h2>Audit Results for {result.url}</h2>
      </div>

      <div className="metrics">
        {result.carbonScore !== undefined && (
          <div className="metric-card">
            <div className="metric-label">Carbon Score</div>
            <div className="metric-value">{result.carbonScore}g CO₂</div>
            <div className="metric-desc">Estimated emissions per page load</div>
          </div>
        )}

        {result.performanceScore !== undefined && (
          <div className="metric-card">
            <div className="metric-label">Performance Score</div>
            <div className="metric-value">{result.performanceScore}/100</div>
            <div className="metric-desc">Overall page speed and efficiency</div>
          </div>
        )}
      </div>

      {result.recommendations && result.recommendations.length > 0 && (
        <div className="recommendations">
          <h3>Recommendations</h3>
          <ul>
            {result.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}