import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 text-primary">
        <Loader2 size={48} className="animate-spin text-accent" />
        <p className="font-heading font-bold text-lg animate-pulse">Loading properties...</p>
      </div>
    </div>
  );
}
