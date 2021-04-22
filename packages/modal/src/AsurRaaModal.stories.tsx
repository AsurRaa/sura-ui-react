import { Story, Meta } from "@storybook/react/types-6-0";
import React from "react";
import {
  AsurRaaDraggableModalProvider,
  AsurRaaModal,
  AsurRaaModalProps,
} from ".";

export default {
  title: "Components/Modal",
  component: AsurRaaModal,
} as Meta;

const Template: Story<AsurRaaModalProps> = (args) => (
  <AsurRaaDraggableModalProvider>
    <AsurRaaModal {...args} />
  </AsurRaaDraggableModalProvider>
);

export const Base = Template.bind({});
Base.args = {
  title: "Modal",
  visible: true,
  initialHeight: 500,
  initialWidth: 500,
};
