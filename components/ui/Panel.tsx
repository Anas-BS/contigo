import type { ReactNode } from 'react';
import { cx } from './cx';

interface PanelProps {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  eyebrow?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  /** Remove body padding, e.g. for tables and lists that run edge to edge. */
  flush?: boolean;
  id?: string;
  as?: 'section' | 'div' | 'aside';
}

/**
 * The one surface container. Panels are never nested; inside a panel,
 * structure content with dividers rather than more boxes.
 */
export function Panel({
  title,
  description,
  actions,
  eyebrow,
  children,
  className,
  bodyClassName,
  flush,
  id,
  as: Tag = 'section',
}: PanelProps) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <Tag
      id={id}
      aria-labelledby={title && headingId ? headingId : undefined}
      className={cx('rounded-md border border-line bg-paper-raised shadow-hairline', className)}
    >
      {(title || actions) && (
        <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 border-b border-line px-5 py-4">
          <div className="min-w-0">
            {eyebrow && <p className="label mb-1">{eyebrow}</p>}
            {title && (
              <h2 id={headingId} className="text-[15px] font-semibold leading-6 text-ink">
                {title}
              </h2>
            )}
            {description && <p className="mt-0.5 text-[13px] leading-5 text-ink-500">{description}</p>}
          </div>
          {actions && <div className="flex max-w-full shrink-0 items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={cx(!flush && 'p-5', bodyClassName)}>{children}</div>
    </Tag>
  );
}
