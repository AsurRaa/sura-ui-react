import { Meta, Story } from "@storybook/react";
import { Button } from "antd";
import { useState } from "react";
import {
  AsurRaaDraggableModalProvider,
  AsurRaaModal,
  AsurRaaModalProps,
} from "./AsurRaaModal";

export default {
  component: AsurRaaModal,
  title: "Components/Modal",
} as Meta;

const Template: Story<AsurRaaModalProps> = (args) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <AsurRaaDraggableModalProvider>
      <Button onClick={() => setOpenModal(true)}>Open Modal</Button>
      <AsurRaaModal
        {...args}
        visible={openModal}
        onCancel={() => setOpenModal(false)}
      />
    </AsurRaaDraggableModalProvider>
  );
};
export const Primary: {
  args: AsurRaaModalProps;
} = Template.bind({});

Primary.args = {
  title: "Modal",
  visible: false,
};
