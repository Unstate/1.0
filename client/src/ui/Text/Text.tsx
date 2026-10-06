import clsx from 'clsx';
import type { ElementType } from 'react';
import styles from './Text.module.scss';

import type { TextProps } from '../../types/text';
export type { TextProps, TextVariant } from '../../types/text';

export function Text<E extends ElementType = 'p'>({
  as,
  variant,
  tone = 'default',
  className,
  children,
  ...props
}: TextProps<E>) {
  const Tag: ElementType = as ?? 'p';
  const typography =
    variant ?? (as === 'h1' || as === 'h2' || as === 'h3' ? as : 'p');
  return (
    <Tag
      {...props}
      className={clsx(styles.base, styles[typography], styles[tone], className)}
    >
      {children}
    </Tag>
  );
}
