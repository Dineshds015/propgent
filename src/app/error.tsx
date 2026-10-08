'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[70vh] flex-col items-center justify-center bg-background px-4">
      <div className="text-center space-y-6 max-w-md">
        <h2 className="text-3xl font-heading font-bold text-primary">Something went wrong!</h2>
        <p className="text-muted-foreground">
          We encountered an error while trying to load this page. Please try again or contact support if the problem persists.
        </p>
        <button
          onClick={() => reset()}
          className="rounded-full bg-primary px-8 py-3.5 font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-md"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
