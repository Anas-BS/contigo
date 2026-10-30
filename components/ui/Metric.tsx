import type { ReactNode } from 'react';
import { cx } from './cx';

export interface MetricItem {
  label: string;
  value: ReactNode;
  unit?: string;
  /** Short qualifying line under the value, e.g. a comparison or definition. */
  context?: ReactNode;
  tone?: 'default' | 'critical' | 'positive';
}

/**
 * A single ruled row of figures, read left to right.
 * Replaces grids of individual KPI cards.
 */
export function MetricStrip({ items, className }: { items: MetricItem[]; className?: string }) {
  return (
    <dl
      className={cx(
        'grid grid-cols-2 overflow-hidden rounded-md border border-line bg-paper-raised shadow-hairline',
        items.length >= 5 ? 'md:grid-cols-3 xl:grid-cols-5' : 'md:grid-cols-4',
        className
      )}
    >
      {items.map((m) => (
        <div
          key={m.label}
          className={cx(
            '-mb-px -mr-px flex flex-col justify-between gap-3 border-b border-r border-line px-5 py-4',
            // With five items, let the last one fill the row so no empty cell is left behind.
            items.length === 5 && 'last:col-span-2 xl:last:col-span-1'
          )}
        >
          <dt className="label">{m.label}</dt>
          <dd>
            <span
              className={cx(
                'num font-display text-[2rem] leading-none tracking-tight',
                m.tone === 'critical' ? 'text-critical' : m.tone === 'positive' ? 'text-positive' : 'text-ink'
              )}
            >
              {m.value}
            </span>
            {m.unit && <span className="num ml-1 text-sm text-ink-500">{m.unit}</span>}
            {m.context && <span className="mt-1.5 block text-[13px] leading-5 text-ink-500">{m.context}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
