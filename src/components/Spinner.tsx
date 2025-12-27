import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  ariaLabel?: string;
}

export function Spinner({ className, ariaLabel = "Loading" }: SpinnerProps) {
  return (
    <div role="status" aria-label={ariaLabel} className={cn("inline-block w-12", className)}>
      <svg
        viewBox="0 0 24 24"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <style>{`
          /* Animate the stroke dash offset to produce a "snake" moving gap around the square */
          @keyframes snake {
            to { stroke-dashoffset: -72; }
          }
          rect.snake {
            animation: snake 1s linear infinite;
            transform-origin: 12px 12px;
          }
          @media (prefers-reduced-motion: reduce) {
            rect.snake { animation: none; }
          }
        `}</style>
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="56 16"
          strokeDashoffset="0"
          className="snake"
        />
      </svg>
    </div>
  );
}
