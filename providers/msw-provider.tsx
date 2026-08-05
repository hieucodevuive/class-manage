'use client';

import { useEffect, useState } from 'react';

let workerPromise: Promise<void> | null = null;

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function enableMocking() {
      if (
        process.env.NODE_ENV !== 'development' ||
        process.env.NEXT_PUBLIC_ENABLE_MSW !== 'true'
      ) {
        setReady(true);
        return;
      }

      if (!workerPromise) {
        workerPromise = (async () => {
          const { worker } = await import('@/mocks/browser');

          await worker.start({
            onUnhandledRequest: 'bypass',
          });
        })();
      }

      await workerPromise;

      setReady(true);
    }

    enableMocking();
  }, []);

  if (!ready) {
    return null;
  }

  return children;
}
