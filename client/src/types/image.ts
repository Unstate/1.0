import type { ComponentPropsWithRef } from 'react';
export type ImageProps = Omit<ComponentPropsWithRef<'img'>, 'src' | 'alt'> & {
  src: string;
  alt: string;
  fit?: 'cover' | 'contain';
};
