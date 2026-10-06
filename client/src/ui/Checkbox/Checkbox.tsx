import { useId } from 'react';
import clsx from 'clsx';
import type { CheckboxProps } from '../../types/checkbox';
import styles from './Checkbox.module.scss';
export function Checkbox({ label, id, className, ...props }: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <label className={clsx(styles.label, className)} htmlFor={inputId}>
      <input {...props} id={inputId} type="checkbox" className={styles.input} />
      <span>{label}</span>
    </label>
  );
}
