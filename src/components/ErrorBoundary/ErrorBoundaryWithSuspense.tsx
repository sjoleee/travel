import { Suspense, type SuspenseProps } from "react";
import { ErrorBoundary, type ErrorBoundaryPropsWithFallback } from "react-error-boundary";

export interface ErrorBoundaryWithSuspenseProps
  extends Omit<ErrorBoundaryPropsWithFallback, "fallback"> {
  errorFallback?: ErrorBoundaryPropsWithFallback["fallback"];
  loadingFallback?: SuspenseProps["fallback"];
}

const ErrorBoundaryWithSuspense = ({
  errorFallback,
  loadingFallback,
  onError,
  children,
}: ErrorBoundaryWithSuspenseProps) => {
  return (
    <ErrorBoundary fallback={errorFallback} onError={onError}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWithSuspense;
