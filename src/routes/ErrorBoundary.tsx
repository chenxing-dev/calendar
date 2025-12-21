import { useRouteError, isRouteErrorResponse } from "react-router";
import { Layout } from "../components/Layout";

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <Layout>
      {isRouteErrorResponse(error) ? (
        <div>
          <h1>
            {error.status} {error.statusText}
          </h1>
          <pre className="whitespace-pre-wrap break-words overflow-x-auto max-w-full">
            {String(error.data)}
          </pre>
        </div>
      ) : error instanceof Error ? (
        <div>
          <h1>Error</h1>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          <pre className="whitespace-pre-wrap break-words overflow-x-auto max-w-full">
            {error.stack}
          </pre>
        </div>
      ) : (
        <h1>Unknown Error</h1>
      )}
    </Layout>
  );
}
