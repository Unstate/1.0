import { useId } from 'react';
import clsx from 'clsx';
import type { InputProps } from '../../types/input';
import styles from './Input.module.scss';
export function Input({
  label,
  id,
  className,
  type = 'text',
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input
        {...props}
        id={inputId}
        type={type}
        className={clsx(styles.input, className)}
      />
    </div>
  );
}
