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

function carbonRating(score: number): string {
  if (score <= 0.5) return 'good';
  if (score <= 2)   return 'ok';
  return 'poor';
}

function perfRating(score: number): string {
  if (score >= 75) return 'good';
  if (score >= 50) return 'ok';
  return 'poor';
}

export function ResultsDashboard({ result, isLoading }: ResultsDashboardProps) {
  if (isLoading) {
    return (
      <div className="dashboard">
        <div className="loading">
          <div className="loading-spinner" />
          <p>Analyzing website...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="dashboard empty">
        <div className="empty-icon">🌱</div>
        <p>Enter a URL above to audit its carbon footprint</p>
      </div>
    );
  }

  const shortUrl = result.url.replace(/^https?:\/\/(www\.)?/, '');

  return (
    <div className="dashboard">
      <div className="result-header">
        <h2>Results for <span className="result-url">{shortUrl}</span></h2>
      </div>

      <div className="metrics">
        {result.carbonScore !== undefined && (
          <div className="metric-card carbon">
            <div className="metric-icon">🍃</div>
            <div className="metric-label">Carbon / Load</div>
            <div className={`metric-value ${carbonRating(result.carbonScore)}`}>
              {result.carbonScore}g
            </div>
            <div className="metric-desc">CO₂ per page visit</div>
          </div>
        )}

        {result.performanceScore !== undefined && (
          <div className="metric-card perf">
            <div className="metric-icon">⚡</div>
            <div className="metric-label">Performance</div>
            <div className={`metric-value ${perfRating(result.performanceScore)}`}>
              {result.performanceScore}<span style={{ fontSize: '1rem', fontWeight: 400 }}>/100</span>
            </div>
            <div className="metric-desc">Page efficiency score</div>
          </div>
        )}
      </div>

      {result.recommendations && result.recommendations.length > 0 && (
        <div className="recommendations">
          <h3>Recommendations</h3>
          <ul>
            {result.recommendations.map((rec, i) => (
              <li key={i}>
                <span className="rec-icon">✓</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
