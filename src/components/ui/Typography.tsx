interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'p';
}

export default function Typography({ children, variant = 'p' }: TypographyProps) {
  const Tag = variant;
  
  return <Tag>{children}</Tag>;
}