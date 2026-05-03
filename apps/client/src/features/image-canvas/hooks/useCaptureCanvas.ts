'use client';

import { type RefObject } from 'react';
import { toBlob } from 'html-to-image';

export const useCaptureCanvas = (ref: RefObject<HTMLDivElement | null>) => {
  const capture = async (): Promise<File | null> => {
    if (!ref.current) return null;
    const blob = await toBlob(ref.current, { pixelRatio: window.devicePixelRatio });
    if (!blob) return null;
    return new File([blob], 'canvas.png', { type: 'image/png' });
  };

  return { capture };
};
