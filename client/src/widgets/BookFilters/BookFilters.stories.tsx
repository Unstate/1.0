import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BookFilters } from './BookFilters';
import { emptyFilters } from '../../utils/filterBooks';
function InteractiveFilters() {
  const [value, setValue] = useState(emptyFilters);
  return (
    <div style={{ maxWidth: 300 }}>
      <BookFilters
        genres={['Fantasy', 'Mystery', 'Science fiction']}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}
const meta = {
  title: 'Widgets/BookFilters',
  component: BookFilters,
  tags: ['autodocs'],
  args: { genres: ['Fantasy'], value: emptyFilters, onChange: () => {} },
  render: () => <InteractiveFilters />
} satisfies Meta<typeof BookFilters>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
