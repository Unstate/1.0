import type { Meta, StoryObj } from '@storybook/react-vite';
import { BookCatalog } from './BookCatalog';
import { sampleBooks } from '../../test/books';
const meta = {
  title: 'Widgets/BookCatalog',
  component: BookCatalog,
  tags: ['autodocs'],
  args: { loadBooks: async () => sampleBooks }
} satisfies Meta<typeof BookCatalog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Empty: Story = { args: { loadBooks: async () => [] } };
export const Loading: Story = {
  args: { loadBooks: () => new Promise(() => {}) }
};
export const FailedRequest: Story = {
  args: {
    loadBooks: async () => {
      throw new Error('Не удалось загрузить книги.');
    }
  }
};
