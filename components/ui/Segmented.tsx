'use client';

import { useId, useRef, type KeyboardEvent } from 'react';
import { cx } from './cx';

interface SegmentedProps<T extends string> {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  hideLabel?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

/** Single-choice control with radio-group semantics and arrow-key navigation. */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  hideLabel = true,
  className,
  size = 'md',
}: SegmentedProps<T>) {
  const id = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (index + delta + options.length) % options.length;
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div className={cx('min-w-0', className)}>
      <span id={id} className={hideLabel ? 'sr-only' : 'label mb-2 block'}>
        {label}
      </span>
      <div
        role="radiogroup"
        aria-labelledby={id}
        className="inline-flex max-w-full overflow-x-auto rounded border border-line-strong bg-paper-raised p-0.5"
      >
        {options.map((o, i) => {
          const checked = o.value === value;
          return (
            <button
              key={o.value}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              onClick={() => onChange(o.value)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cx(
                'shrink-0 rounded-sm font-medium transition-colors duration-150',
                size === 'sm' ? 'h-7 px-2.5 text-[13px]' : 'h-8 px-3 text-[13px]',
                checked ? 'bg-ink text-paper' : 'text-ink-600 hover:bg-paper-sunken hover:text-ink'
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
