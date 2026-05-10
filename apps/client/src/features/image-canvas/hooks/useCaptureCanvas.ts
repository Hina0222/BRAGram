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
      const options = { pixelRatio, skipAutoScale: true };

      await toBlob(ref.current, options);
      await toBlob(ref.current, options);
      await toBlob(ref.current, options);
      const blob = await toBlob(ref.current, options);

      if (!blob) return null;

      return new File([blob], 'canvas.png', { type: 'image/png' });
    } catch (error) {
      console.error('Capture failed:', error);
      return null;
    }
  };

  return { capture };
};
