import { forwardRef, useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from 'react';
import { cx } from './cx';

export const controlStyles =
  'block w-full rounded border border-line-control bg-paper-raised px-3 text-[15px] text-ink placeholder:text-ink-500 transition-[border-color,box-shadow] duration-150 hover:border-ink-500 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ember-500/30 aria-[invalid=true]:border-critical aria-[invalid=true]:focus:ring-critical/20 disabled:opacity-60';

interface FieldProps {
  label: ReactNode;
  hint?: ReactNode;
  error?: string;
  className?: string;
  /** Render the label visually hidden while keeping it for assistive tech. */
  hideLabel?: boolean;
  children: (ids: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
}

/** Label, control, hint and error wired together with ids. */
export function Field({ label, hint, error, className, hideLabel, children }: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  return (
    <div className={cx('space-y-1.5', className)}>
      <label htmlFor={id} className={cx('block text-[13px] font-medium text-ink-700', hideLabel && 'sr-only')}>
        {label}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {hint && !error && (
        <p id={hintId} className="text-[13px] text-ink-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-[13px] text-critical">
          {error}
        </p>
      )}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref
) {
  return <input ref={ref} className={cx(controlStyles, 'h-10', className)} {...props} />;
});

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select(
  { className, children, ...props },
  ref
) {
  return (
    <div className="relative">
      <select ref={ref} className={cx(controlStyles, 'h-10 appearance-none pr-9', className)} {...props}>
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-500"
      >
        <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
});
