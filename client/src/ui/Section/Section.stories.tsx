import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from './Section';
import { Text } from '../Text/Text';
const meta = {
  title: 'UI/Section',
  component: Section,
  tags: ['autodocs'],
  args: {
    'aria-labelledby': 'section-title',
    children: (
      <>
        <Text as="h2" id="section-title">
          Notes in the margins.
        </Text>
        <Text tone="muted">
          A semantic section with responsive vertical padding.
        </Text>
      </>
    )
  }
} satisfies Meta<typeof Section>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
