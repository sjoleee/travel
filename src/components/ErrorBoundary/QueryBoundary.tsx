import { QueryErrorResetBoundary } from "@tanstack/react-query";

import ErrorBoundaryWithSuspense, {
  type ErrorBoundaryWithSuspenseProps,
} from "./ErrorBoundaryWithSuspense";

const QueryBoundary = ({ children, ...props }: ErrorBoundaryWithSuspenseProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundaryWithSuspense {...props} onReset={reset}>
          {children}
        </ErrorBoundaryWithSuspense>
      )}
    </QueryErrorResetBoundary>
  );
};

export default QueryBoundary;
