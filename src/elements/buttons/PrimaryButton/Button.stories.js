import {Button} from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Buttons/Button',
  component: Button,
};

export const Primary = {
    render: () => <Button type="primary">Primary</Button>,
};

export const Cancel = {
  render: () => <Button type="cancel">Cancel</Button>,
};

export const Confirm = {
  render: () => <Button type="confirm">Confirm</Button>,
};