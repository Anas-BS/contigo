import type { ReactNode } from 'react';
import { cx } from './cx';

export type Tone = 'neutral' | 'positive' | 'caution' | 'critical' | 'info' | 'brand';

const tones: Record<Tone, string> = {
  neutral: 'bg-paper-sunken text-ink-700',
  positive: 'bg-positive-soft text-positive',
  caution: 'bg-caution-soft text-caution',
  critical: 'bg-critical-soft text-critical',
  info: 'bg-info-soft text-info',
  brand: 'bg-ember-50 text-ember-800',
};

const dots: Record<Tone, string> = {
  neutral: 'bg-ink-500',
  positive: 'bg-positive',
  caution: 'bg-caution',
  critical: 'bg-critical',
  info: 'bg-info',
  brand: 'bg-ember-600',
};

/** Compact status label. Colour is never the only signal: the text carries the meaning. */
export function StatusTag({
  tone = 'neutral',
  children,
  dot = false,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm px-1.5 py-0.5 text-xs font-medium leading-4',
        tones[tone],
        className
      )}
    >
      {dot && <span aria-hidden="true" className={cx('h-1.5 w-1.5 rounded-full', dots[tone])} />}
      {children}
    </span>
  );
}
