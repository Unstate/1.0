import { Text } from '../../ui';
import styles from './Header.module.scss';
export function Header() {
  return (
    <header className={styles.header}>
      <Text as="a" href="/" variant="h3" className={styles.brand}>
        Анстейт <span>Space</span>
        <span aria-hidden="true">_</span>
      </Text>
      <Text as="span" variant="caption" tone="muted">
        Место для хороших книг
      </Text>
    </header>
  );
}
