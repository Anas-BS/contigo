import { cx } from '@/components/ui/cx';

interface ColumnStripProps {
  data: { label: string; value: number; highlight?: boolean }[];
  max: number;
  min?: number;
  unit?: string;
  height?: number;
  title: string;
  showValues?: boolean;
  className?: string;
}

/** Small vertical columns, for short series such as a week of check-ins. */
export function ColumnStrip({ data, max, min = 0, unit = '', height = 96, title, showValues = true, className }: ColumnStripProps) {
  return (
    <figure className={cx('w-full', className)}>
      <div className="flex items-end gap-1.5" style={{ height }} aria-hidden="true">
        {data.map((d, i) => {
          const h = Math.max(4, ((d.value - min) / (max - min)) * 100);
          return (
            <div key={`${d.label}-${i}`} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
              {showValues && <span className="num text-2xs text-ink-500">{d.value}</span>}
              <span
                className={cx('w-full max-w-[28px] rounded-sm', d.highlight ? 'bg-ember-600' : 'bg-ink/80')}
                style={{ height: `${h}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-1.5 flex gap-1.5" aria-hidden="true">
        {data.map((d, i) => (
          <span key={`${d.label}-${i}`} className={cx('flex-1 text-center text-2xs', d.highlight ? 'font-semibold text-ink' : 'text-ink-500')}>
            {d.label}
          </span>
        ))}
      </div>
      <table className="sr-only">
        <caption>{title}</caption>
        <tbody>
          {data.map((d, i) => (
            <tr key={`${d.label}-${i}`}>
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
