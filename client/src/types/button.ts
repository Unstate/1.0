import type { ComponentPropsWithRef } from 'react';
type Appearance = { variant?: 'primary' | 'secondary' };
type NativeButton = Appearance &
  ComponentPropsWithRef<'button'> & { as?: 'button'; href?: never };
type NativeLink = Appearance &
  Omit<ComponentPropsWithRef<'a'>, 'href'> & {
    as: 'a';
    href: string;
    disabled?: never;
  };
export type ButtonProps = NativeButton | NativeLink;
