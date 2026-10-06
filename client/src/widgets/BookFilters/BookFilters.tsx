import { Button, Checkbox, Input, Text } from '../../ui';
import type { BookFiltersProps } from '../../types/catalog';
import { emptyFilters } from '../../utils/filterBooks';
import styles from './BookFilters.module.scss';
export function BookFilters({ genres, value, onChange }: BookFiltersProps) {
  const toggleGenre = (genre: string, checked: boolean) =>
    onChange({
      ...value,
      genres: checked
        ? [...value.genres, genre]
        : value.genres.filter((item) => item !== genre)
    });
  const active = Boolean(value.query || value.genres.length || value.shortOnly);
  return (
    <aside aria-label="Фильтры книг" className={styles.filters}>
      <Text as="h2" variant="h3">
        Фильтры
      </Text>
      <Input
        label="Название или автор"
        type="search"
        placeholder="Найти книгу…"
        value={value.query}
        onChange={(event) => onChange({ ...value, query: event.target.value })}
      />
      <fieldset className={styles.group}>
        <legend>Жанры</legend>
        {genres.map((genre) => (
          <Checkbox
            key={genre}
            label={genre}
            checked={value.genres.includes(genre)}
            onChange={(event) => toggleGenre(genre, event.target.checked)}
          />
        ))}
      </fieldset>
      <fieldset className={styles.group}>
        <legend>Объём</legend>
        <Checkbox
          label="До 300 страниц"
          checked={value.shortOnly}
          onChange={(event) =>
            onChange({ ...value, shortOnly: event.target.checked })
          }
        />
      </fieldset>
      <Button
        variant="secondary"
        disabled={!active}
        onClick={() => onChange({ ...emptyFilters, genres: [] })}
      >
        Сбросить фильтры
      </Button>
    </aside>
  );
}
