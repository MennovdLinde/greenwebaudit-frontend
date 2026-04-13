interface HistoryEntry {
  id: number;
  url: string;
  carbon_score: number;
  performance_score: number;
  page_size: number;
  created_at: string;
}

interface AuditHistoryProps {
  entries: HistoryEntry[];
  isLoading: boolean;
  onSelect: (url: string) => void;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)   return 'just now';
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)   return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function carbonColor(score: number): string {
  if (score <= 0.5) return '#16a34a';
  if (score <= 2)   return '#ca8a04';
  return '#dc2626';
}

export function AuditHistory({ entries, isLoading, onSelect }: AuditHistoryProps) {
  if (isLoading) {
    return (
      <div className="history-section">
        <div className="history-header"><h3>Recent Audits</h3></div>
        <div className="history-loading">Loading history...</div>
      </div>
    );
  }

  if (entries.length === 0) return null;

  return (
    <div className="history-section">
      <div className="history-header">
        <h3>Recent Audits</h3>
        <span className="history-count">{entries.length} audits</span>
      </div>
      <div className="history-list">
        {entries.map((entry) => {
          const shortUrl = entry.url.replace(/^https?:\/\/(www\.)?/, '');
          return (
            <button
              key={entry.id}
              className="history-row"
              onClick={() => onSelect(entry.url)}
              title={`Re-audit ${entry.url}`}
            >
              <div className="history-url">{shortUrl}</div>
              <div className="history-meta">
                <span
                  className="history-carbon"
                  style={{ color: carbonColor(entry.carbon_score) }}
                >
                  {entry.carbon_score}g CO₂
                </span>
                <span className="history-perf">{entry.performance_score}/100</span>
                <span className="history-time">{timeAgo(entry.created_at)}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
