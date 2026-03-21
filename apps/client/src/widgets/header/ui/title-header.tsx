import { ReactNode } from 'react';

interface TitleHeaderProps {
  title: string;
  right?: ReactNode;
}

export function TitleHeader({ title, right }: TitleHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-primary/10 bg-background/80 px-5 pt-10 pb-2 shadow-sm backdrop-blur-md">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      {right && <div>{right}</div>}
    </header>
  );
}
