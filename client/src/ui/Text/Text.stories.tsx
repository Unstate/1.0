import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';
const meta = {
  title: 'UI/Text',
  component: Text,
  tags: ['autodocs'],
  args: { children: 'One more chapter.' }
} satisfies Meta<typeof Text>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Paragraph: Story = {};
export const Heading: Story = { args: { as: 'h1', tone: 'accent' } };
export const Caption: Story = {
  args: { as: 'span', variant: 'caption', tone: 'muted' }
};
export const Scale: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Text as="h1">Stories worth keeping.</Text>
      <Text as="h2">The reading room.</Text>
      <Text as="h3">A new perspective.</Text>
      <Text>Good stories never get old.</Text>
      <Text variant="caption" tone="accent">
        Volume 01 / Independent archive
      </Text>
    </div>
  )
};
