import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image } from './Image';
const meta = {
  title: 'UI/Image',
  component: Image,
  tags: ['autodocs'],
  args: {
    src: '/book-cover.svg',
    alt: 'The Art of Slowing Down book cover',
    width: 240,
    height: 290,
    loading: 'eager'
  }
} satisfies Meta<typeof Image>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Contain: Story = {
  args: {
    fit: 'contain',
    style: { width: 320, height: 220, background: '#292929' }
  }
};
export const Cover: Story = {
  args: { fit: 'cover', style: { width: 320, height: 220 } }
};
