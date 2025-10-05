import React, { Component, Suspense } from "react";
import LoadingSpinner from "../common/LoadingSpinner";

/**
 * RouteErrorBoundary
 * A class-based Error Boundary that catches render-time errors in all descendant
 * components (including those thrown during rendering, in constructors, and in
 * lifecycle methods). It will NOT catch:
 *  - Errors in event handlers (wrap those manually with try/catch)
 *  - Errors in async callbacks/promises (unless the promise rejection is turned into a thrown error in render)
 *  - Errors occurring inside server-side rendering on the server
 *  - Errors thrown by code outside the React tree
 */
class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null, retryCount: 0 };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    if (this.props.onError) {
      this.props.onError(error, info);
    }
    // Place for logging service integration (Sentry, LogRocket, etc.)
    // e.g., logService.capture(error, info.componentStack)
  }

  handleRetry = () => {
    // Simple retry: clear error and increment a key that can force remount children if provided
    this.setState((s) => ({ error: null, info: null, retryCount: s.retryCount + 1 }));
    if (this.props.onRetry) this.props.onRetry();
  };

  render() {
    const { error, retryCount } = this.state;
    const { children, fallback } = this.props;

    if (error) {
      // Recognize common dynamic import (chunk) failures so we can show a more helpful message.
      const isChunkError = /Loading chunk [\d]+ failed|ChunkLoadError|dynamic import/i.test(error.message || "");

      return (
        <div className="max-w-md mx-auto mt-24 p-6 rounded-lg bg-base-200 shadow animate-fade-in text-center space-y-4">
          <h2 className="text-xl font-semibold text-error">Something went wrong</h2>
          <p className="text-sm opacity-80 break-words">
            {isChunkError
              ? "A network or cache issue prevented part of the app from loading."
              : error.message || "Unexpected rendering error."}
          </p>
          <div className="flex flex-col gap-2">
            <button className="btn btn-sm btn-primary" onClick={this.handleRetry}>
              Retry
            </button>
            <button className="btn btn-sm btn-outline" onClick={() => window.location.reload()}>
              Full Reload
            </button>
          </div>
          <details className="text-left mt-2 text-xs opacity-70">
            <summary>Details</summary>
            <pre className="whitespace-pre-wrap max-h-40 overflow-auto">{error.stack || String(error)}</pre>
          </details>
        </div>
      );
    }

    // Optionally wrap children with a key so retry remounts the subtree
    return <div key={retryCount}>{children}</div>;
  }
}

/**
 * Suspense + Error boundary convenience wrapper.
 * Renders a spinner (or custom fallback) while lazy components load and
 * gracefully handles runtime errors beneath it.
 */
export function BoundaryWithSuspense({ children, suspenseFallback, ...boundaryProps }) {
  // We intentionally keep the Suspense INSIDE the error boundary so that
  // chunk load (dynamic import) errors bubble up to the boundary.
  return (
    <RouteErrorBoundary {...boundaryProps}>
      <SuspenseFallback fallback={suspenseFallback}>{children}</SuspenseFallback>
    </RouteErrorBoundary>
  );
}

function SuspenseFallback({ children, fallback }) {
  return (
    <Suspense
      fallback={
        fallback || (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        )
      }
    >
      {children}
    </Suspense>
  );
}

export default RouteErrorBoundary;
