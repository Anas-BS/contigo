import type { ReactNode } from 'react';
import { cx } from '@/components/ui/cx';

export interface BarDatum {
  key: string;
  label: ReactNode;
  value: number;
  /** Highlight a bar (e.g. below a reference) in ember. */
  emphasis?: boolean;
  /** Dim a bar when another one is in focus. */
  muted?: boolean;
  note?: ReactNode;
}

interface BarListProps {
  data: BarDatum[];
  max?: number;
  unit?: string;
  reference?: { value: number; label: string };
  className?: string;
  /** Accessible description of the list. */
  label: string;
}

/** Horizontal bars with direct value labels and an optional reference line. */
export function BarList({ data, max = 100, unit = '%', reference, className, label }: BarListProps) {
  const pct = (v: number) => `${Math.max(0, Math.min(100, (v / max) * 100))}%`;
  return (
    <div className={cx('relative', className)}>
      <ul aria-label={label} className="space-y-3">
        {data.map((d) => (
          <li
            key={d.key}
            className={cx('grid grid-cols-[minmax(5.5rem,8rem)_1fr_3rem] items-center gap-3 transition-opacity', d.muted && 'opacity-40')}
          >
            <span className="truncate text-[13px] text-ink-700">{d.label}</span>
            <span className="relative h-2.5 rounded-sm bg-paper-sunken">
              <span
                className={cx('absolute inset-y-0 left-0 rounded-sm', d.emphasis ? 'bg-ember-600' : 'bg-ink')}
                style={{ width: pct(d.value) }}
              />
              {reference && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 -top-1 w-px bg-ink-500"
                  style={{ left: pct(reference.value) }}
                />
              )}
            </span>
            <span className="num text-right text-[13px] font-medium text-ink">
              {d.value}
              {unit}
            </span>
            {d.note && <span className="col-start-2 col-end-4 -mt-2 text-xs text-ink-500">{d.note}</span>}
          </li>
        ))}
      </ul>
      {reference && (
        <p className="mt-4 flex items-center gap-2 text-xs text-ink-500">
          <span aria-hidden="true" className="inline-block h-3 w-px bg-ink-500" />
          {reference.label}: <span className="num font-medium text-ink-700">{reference.value}{unit}</span>
        </p>
      )}
    </div>
  );
}
