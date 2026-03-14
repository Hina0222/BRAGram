interface TitleHeaderProps {
  title: string;
}

export function TitleHeader({ title }: TitleHeaderProps) {
  return (
    <header className="px-5 pt-12 pb-4">
      <h1 className="text-xl font-bold text-foreground">{title}</h1>
    </header>
  );
}
