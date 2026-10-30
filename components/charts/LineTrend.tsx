import { cx } from '@/components/ui/cx';

interface Point {
  label: string;
  value: number;
}

interface LineTrendProps {
  data: Point[];
  /** Accessible title describing what the line shows. */
  title: string;
  min?: number;
  max?: number;
  unit?: string;
  /** Optional horizontal reference, e.g. a target or school average. */
  reference?: { value: number; label: string };
  height?: number;
  className?: string;
}

/**
 * Minimal line chart. Direct labels on first and last points (above the line) instead of a legend
 * or tooltip, a single reference line labelled at its right end, below the line, and a screen-reader table.
 */
export function LineTrend({ data, title, min = 0, max = 100, unit = '%', reference, height = 180, className }: LineTrendProps) {
  const n = data.length;
  const x = (i: number) => (n === 1 ? 50 : (i / (n - 1)) * 100);
  const y = (v: number) => 100 - ((v - min) / (max - min)) * 100;
  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(d.value)}`).join(' ');
  const ticks = [min, (min + max) / 2, max];
  const last = data[n - 1];
  const first = data[0];

  return (
    <figure className={cx('w-full', className)}>
      <div className="flex">
        <div className="relative w-8 shrink-0" style={{ height }} aria-hidden="true">
          {ticks.map((t) => (
            <span key={t} className="num absolute right-2 -translate-y-1/2 text-2xs text-ink-500" style={{ top: `${y(t)}%` }}>
              {t}
            </span>
          ))}
        </div>
        <div className="relative flex-1" style={{ height }} aria-hidden="true">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
            {ticks.map((t) => (
              <line key={t} x1="0" x2="100" y1={y(t)} y2={y(t)} stroke="#E0D9CB" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            ))}
            {reference && (
              <line
                x1="0"
                x2="100"
                y1={y(reference.value)}
                y2={y(reference.value)}
                stroke="#6B665C"
                strokeWidth="1"
                strokeDasharray="3 3"
                vectorEffect="non-scaling-stroke"
              />
            )}
            <path d={path} fill="none" stroke="#1C1B18" strokeWidth="1.75" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </svg>
          {data.map((d, i) => (
            <span
              key={d.label}
              className={cx(
                'absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-ink',
                i === n - 1 ? 'bg-ember-600 border-ember-600' : 'bg-paper-raised'
              )}
              style={{ left: `${x(i)}%`, top: `${y(d.value)}%` }}
            />
          ))}
          {reference && (
            <span
              className="absolute right-1 pt-1 text-2xs text-ink-500"
              style={{ top: `${y(reference.value)}%` }}
            >
              {reference.label}
            </span>
          )}
          <span
            className="num absolute -translate-x-full -translate-y-full pb-2 pr-1 text-[13px] font-semibold text-ink"
            style={{ left: `${x(n - 1)}%`, top: `${y(last.value)}%` }}
          >
            {last.value}
            {unit}
          </span>
          {n > 1 && (
            <span
              className="num absolute -translate-y-full pb-2 pl-1 text-[13px] text-ink-500"
              style={{ left: `${x(0)}%`, top: `${y(first.value)}%` }}
            >
              {first.value}
              {unit}
            </span>
          )}
        </div>
      </div>
      <div className="ml-8 mt-2 flex justify-between" aria-hidden="true">
        {data.map((d) => (
          <span key={d.label} className="text-2xs text-ink-500">
            {d.label}
          </span>
        ))}
      </div>
      <table className="sr-only">
        <caption>{title}</caption>
        <tbody>
          {data.map((d) => (
            <tr key={d.label}>
              <th scope="row">{d.label}</th>
              <td>
                {d.value}
                {unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
