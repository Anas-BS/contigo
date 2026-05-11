'use client';

import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('[Contigo] Uncaught error:', error, info);
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    if (this.props.fallback) return this.props.fallback(error, this.reset);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6">
        <div className="max-w-md w-full backdrop-blur-md bg-white/5 border border-orange-400/30 rounded-2xl p-8 text-center space-y-4">
          <div className="text-5xl">🛟</div>
          <h2 className="text-2xl font-bold text-white">Something went sideways</h2>
          <p className="text-white/70 text-sm">
            Tigo hit an unexpected error. The team has been notified. You can try reloading this view.
          </p>
          <pre className="text-xs text-white/40 bg-black/30 rounded-lg p-3 overflow-auto text-left">
            {error.message}
          </pre>
          <button
            onClick={this.reset}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-shadow"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }
}
