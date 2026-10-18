import type { AnchorHTMLAttributes } from 'react';

type Props = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'target' | 'rel' | 'href'
> & { href: string };

export function ExternalLink({ children, ...props }: Props) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
