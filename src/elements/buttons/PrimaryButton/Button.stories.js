import {Button} from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Buttons/Button',
  component: Button,
};

export const Primary = {
  args: {
    type: 'primary',
    children: "Primary"
  },
};

export const Cancel = {
  args: {
    type: 'cancel',
    children: "Cancel"
  },
};

export const Confirm = {
  args: {
    type: 'confirm',
    children: "Confirm"
  },
};
