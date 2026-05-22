'use client';

import * as React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import { ReactNode } from 'react';

interface ConfirmDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  isPending?: boolean;
}

function ConfirmDialog({
  open,
  onOpenChange,
  trigger,
  title,
  cancelLabel = '취소',
  confirmLabel = '확인',
  onCancel,
  onConfirm,
  isPending,
}: ConfirmDialogProps) {
  const handleCancel = () => {
    onCancel?.();
    onOpenChange?.(false);
  };

  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        showCloseButton={false}
        className="h-auto rounded-[20px] bg-[#FFFFFF] px-4 pt-9 pb-3.5"
      >
        <DialogHeader className="mb-6.5">
          <DialogTitle className="text-center text-base font-medium text-[#131313]">
            {title}
          </DialogTitle>
          <DialogDescription className="sr-only">{title}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <button
              type="button"
              className="flex-1 rounded-[10px] bg-[#E1E1E3] py-3.5 text-sm font-medium text-[#131313]"
              onClick={handleCancel}
            >
              {cancelLabel}
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
              type="button"
              className="flex-1 rounded-[10px] bg-[#FADF78] py-3.5 text-sm font-medium text-[#131313] disabled:opacity-50"
              onClick={handleConfirm}
              disabled={isPending}
            >
              {confirmLabel}
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { ConfirmDialog };
