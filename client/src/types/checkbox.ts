import type { ComponentPropsWithRef, ReactNode } from 'react';
export type CheckboxProps = Omit<
  ComponentPropsWithRef<'input'>,
  'type' | 'children'
> & { label: ReactNode };
