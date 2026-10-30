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
      <div role="alert" className="flex min-h-screen items-center justify-center bg-paper px-5">
        <div className="w-full max-w-md">
          <p className="label">Something went wrong</p>
          <h1 className="mt-2 font-display text-[2rem] leading-10 text-ink">This view could not load</h1>
          <p className="mt-2 text-[15px] leading-6 text-ink-600">
            An unexpected error stopped the page from rendering. Your data has not changed. Try again, or go back to the start.
          </p>
          <pre className="mt-5 overflow-auto rounded border border-line bg-paper-sunken p-3 font-mono text-xs text-ink-700">{error.message}</pre>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={this.reset}
              className="inline-flex h-10 items-center rounded bg-ink px-4 text-sm font-medium text-paper transition-colors hover:bg-ink-800"
            >
              Try again
            </button>
            <a href="/" className="inline-flex h-10 items-center px-2 text-sm font-medium text-ember-700 underline underline-offset-4">
              Go to the start
            </a>
          </div>
        </div>
      </div>
    );
  }
}
