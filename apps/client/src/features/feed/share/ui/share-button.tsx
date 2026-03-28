'use client';

import { Share2 } from 'lucide-react';
import { Button } from '@/shared/ui';
import { toast } from 'sonner';

interface ShareButtonProps {
  feedId: number;
}

export function ShareButton({ feedId }: ShareButtonProps) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/feed/${feedId}`);
      toast.success('링크가 복사되었습니다');
    } catch {
      toast.error('링크 복사에 실패했습니다');
    }
  };

  return (
    <Button variant="ghost" size="xs" onClick={handleCopyLink} className="gap-1.5 px-2">
      <Share2 size={16} />
    </Button>
  );
}
