import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';
const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    label: 'Название или автор',
    placeholder: 'Найти книгу…',
    type: 'search'
  }
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
