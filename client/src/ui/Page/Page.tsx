import clsx from 'clsx';
import styles from './Page.module.scss';

import type { PageProps } from '../../types/page';
export type { PageProps } from '../../types/page';

export function Page({ className, ...props }: PageProps) {
  return <div {...props} className={clsx(styles.page, className)} />;
}
