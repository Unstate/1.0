import clsx from 'clsx';
import styles from './Button.module.scss';

import type { ButtonProps } from '../../types/button';
export type { ButtonProps } from '../../types/button';

export function Button(props: ButtonProps) {
  if (props.as === 'a') {
    const {
      as: Tag,
      variant = 'primary',
      className,
      rel,
      target,
      ...rest
    } = props;
    return (
      <Tag
        {...rest}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={clsx(styles.base, styles[variant], className)}
      />
    );
  }
  const {
    as: Tag = 'button',
    variant = 'primary',
    className,
    type = 'button',
    ...rest
  } = props;
  return (
    <Tag
      {...rest}
      type={type}
      className={clsx(styles.base, styles[variant], className)}
    />
  );
}
