import { afterEach } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import { flushSync } from 'react-dom';
import type { ReactNode } from 'react';
import '../app/global.scss';
const mounted: { root: Root; container: HTMLDivElement }[] = [];
export function render(node: ReactNode, width?: number) {
  const container = document.createElement('div');
  if (width) container.style.width = `${width}px`;
  document.body.append(container);
  const root = createRoot(container);
  mounted.push({ root, container });
  flushSync(() => root.render(node));
  return container;
}
afterEach(() => {
  for (const { root, container } of mounted.splice(0)) {
    root.unmount();
    container.remove();
  }
});
