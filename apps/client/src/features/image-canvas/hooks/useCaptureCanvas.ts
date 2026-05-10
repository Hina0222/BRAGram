'use client';

import { type RefObject } from 'react';
import { toBlob } from 'html-to-image';

export const useCaptureCanvas = (ref: RefObject<HTMLDivElement | null>) => {
  const capture = async (): Promise<File | null> => {
    if (!ref.current) return null;

    try {
      const TARGET_WIDTH = 1200;
      const { width: currentWidth } = ref.current.getBoundingClientRect();

      const pixelRatio = TARGET_WIDTH / currentWidth;

      const blob = await toBlob(ref.current, {
        pixelRatio,
        skipAutoScale: true,
      });

      if (!blob) return null;

      return new File([blob], 'canvas.png', { type: 'image/png' });
    } catch (error) {
      console.error('Capture failed:', error);
      return null;
    }
  };

  return { capture };
};
