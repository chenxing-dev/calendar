import { useRouteError, isRouteErrorResponse } from "react-router";
import { Layout } from "@/components/Layout";

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <Layout>
      {isRouteErrorResponse(error) ? (
        <div>
          <h1>
            {error.status} {error.statusText}
          </h1>
          <p>{String(error.data)}</p>
        </div>
      ) : error instanceof Error ? (
        <div>
          <h1>Error</h1>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          <p>{error.stack}</p>
        </div>
      ) : (
        <h1>Unknown Error</h1>
      )}
    </Layout>
  );
}
