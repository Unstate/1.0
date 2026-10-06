import clsx from 'clsx';
import styles from './Section.module.scss';

import type { SectionProps } from '../../types/section';
export type { SectionProps } from '../../types/section';

export function Section({ className, ...props }: SectionProps) {
  return <section {...props} className={clsx(styles.section, className)} />;
}
