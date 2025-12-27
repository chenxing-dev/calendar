import { Spinner } from "@/components/Spinner";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center bg-background/75">
      <Spinner />
    </div>
  );
}
