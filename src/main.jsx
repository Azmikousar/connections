import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// Shows the real error on screen instead of a blank page
class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error('App crashed:', error, info);
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="boot" style={{ padding: 24, textAlign: 'center' }}>
        <div style={{ maxWidth: 420 }}>
          <img src="/logo-icon.png" alt="" style={{ width: 72, margin: '0 auto 16px', animation: 'none' }} />
          <h2 style={{ color: '#2e1065', margin: '0 0 8px' }}>Something went wrong</h2>
          <p style={{ color: '#6b7280', margin: '0 0 12px' }}>Please send this message to your developer:</p>
          <pre
            style={{
              whiteSpace: 'pre-wrap', wordBreak: 'break-word', textAlign: 'left', background: '#fef2f2',
              color: '#b91c1c', padding: 12, borderRadius: 12, fontSize: 13,
            }}
          >
            {String(this.state.error && (this.state.error.stack || this.state.error.message || this.state.error)).slice(0, 700)}
          </pre>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
