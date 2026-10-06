import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page } from './Page';
import { Text } from '../Text/Text';
const meta = {
  title: 'UI/Page',
  component: Page,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    children: (
      <div style={{ border: '1px dashed #ff8a3d', padding: 24 }}>
        <Text as="h1">The reading room.</Text>
        <Text>
          Maximum outer width: 1440px. Resize the viewport to explore the
          gutters.
        </Text>
      </div>
    )
  }
} satisfies Meta<typeof Page>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Narrow: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 375 }}>
        <Story />
      </div>
    )
  ]
};
