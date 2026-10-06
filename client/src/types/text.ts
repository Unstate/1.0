import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
export type TextVariant = 'p' | 'h1' | 'h2' | 'h3' | 'caption';
type OwnProps<E extends ElementType> = {
  as?: E;
  variant?: TextVariant;
  tone?: 'default' | 'muted' | 'accent';
  children?: ReactNode;
  className?: string;
};
export type TextProps<E extends ElementType = 'p'> = OwnProps<E> &
  Omit<ComponentPropsWithRef<E>, keyof OwnProps<E>>;
