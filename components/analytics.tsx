'use client';

import { useEffect } from 'react';

export function AnalyticsStub() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.info('Analytics stub loaded');
    }
  }, []);

  return null;
}
