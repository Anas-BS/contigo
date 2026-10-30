import { cx } from '@/components/ui/cx';

/** A thin inline bar for a single 0 to 100 value, used inside table cells. */
export function Meter({ value, tone = 'ink', className }: { value: number; tone?: 'ink' | 'critical' | 'caution' | 'positive'; className?: string }) {
  const color = { ink: 'bg-ink', critical: 'bg-critical', caution: 'bg-caution', positive: 'bg-positive' }[tone];
  return (
    <span aria-hidden="true" className={cx('relative block h-1 w-16 rounded-sm bg-paper-sunken', className)}>
      <span className={cx('absolute inset-y-0 left-0 rounded-sm', color)} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </span>
  );
}
