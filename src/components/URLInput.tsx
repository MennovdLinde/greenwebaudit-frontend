import { useState } from 'react';

interface URLInputProps {
    onSubmit: (url: string) => void;
    isLoading: boolean;
}

function normalizeUrl(input: string): string {
    // Remove whitespace
    let url = input.trim();
    
    // If no protocol, add https://
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
    }
    
    // If URL starts with https:// but no www, add it
    // But skip this if it's already a subdomain (like api.example.com)
    if ((url.startsWith('https://') || url.startsWith('http://')) && !url.includes('www.')) {
        const protocol = url.startsWith('https://') ? 'https://' : 'http://';
        const domain = url.replace(/^https?:\/\//, '');
        
        // Only add www if it's a root domain (no existing subdomain)
        if (!domain.includes('.') || domain.split('.').length === 2) {
            url = `${protocol}www.${domain}`;
        }
    }
    
    return url;
}

export function URLInput({ onSubmit, isLoading }: URLInputProps) {
    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url.trim()) {
            const fullUrl = normalizeUrl(url);
            onSubmit(fullUrl);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Enter website (e.g., google.com or example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={isLoading}
                    className="url-input"
                />
                <button type="submit" disabled={isLoading} className="submit-btn">
                    {isLoading ? 'Analyzing...' : 'Audit Website'}
                </button>
            </div>
            {!url && <p className="hint">Enter a URL to analyze its carbon footprint and performance</p>}
        </form>
    );
}
