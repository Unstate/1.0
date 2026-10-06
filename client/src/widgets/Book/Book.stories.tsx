import type { Meta, StoryObj } from '@storybook/react-vite';
import { Book } from './Book';
import { sampleBooks } from '../../test/books';
const meta = {
  title: 'Widgets/Book',
  component: Book,
  tags: ['autodocs'],
  args: { book: sampleBooks[0] }
} satisfies Meta<typeof Book>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const ShortBook: Story = { args: { book: sampleBooks[1] } };
