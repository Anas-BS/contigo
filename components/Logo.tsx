import Link from 'next/link';
import { cx } from '@/components/ui/cx';

interface LogoProps {
  href?: string;
  className?: string;
  /** 'ink' on paper backgrounds, 'paper' on ink backgrounds. */
  tone?: 'ink' | 'paper';
  size?: 'sm' | 'md';
}

/** The Contigo mark: an open book whose right page becomes a speech bubble. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className={className}>
      <path d="M3 7.2c3.4-1.4 7-1.1 10.4 1v14.1c-3.4-1.9-7-2.2-10.4-1z" fill="#F97B4F" />
      <path
        d="M25 7.2c-3.4-1.4-7-1.1-10.4 1v14.1c1.5-.85 3-1.4 4.6-1.7l2.2 3.4v-3.6c1.2.05 2.4.25 3.6.6z"
        fill="#E0612F"
      />
    </svg>
  );
}

export default function Logo({ href = '/', className, tone = 'ink', size = 'md' }: LogoProps) {
  const content = (
    <span className={cx('inline-flex items-center gap-2', className)}>
      <LogoMark className={size === 'sm' ? 'h-6 w-6' : 'h-7 w-7'} />
      <span
        className={cx(
          'font-display font-medium tracking-tight',
          size === 'sm' ? 'text-xl' : 'text-[1.4rem]',
          tone === 'ink' ? 'text-ink' : 'text-paper'
        )}
      >
        Contigo
      </span>
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="Contigo, home" className="inline-flex rounded-sm">
      {content}
    </Link>
  );
}
