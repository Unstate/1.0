import clsx from 'clsx';
import styles from './Image.module.scss';

import type { ImageProps } from '../../types/image';
export type { ImageProps } from '../../types/image';

export function Image({
  className,
  fit = 'cover',
  loading = 'lazy',
  decoding = 'async',
  alt,
  ...props
}: ImageProps) {
  return (
    <img
      {...props}
      alt={alt}
      loading={loading}
      decoding={decoding}
      className={clsx(styles.image, styles[fit], className)}
    />
  );
}
