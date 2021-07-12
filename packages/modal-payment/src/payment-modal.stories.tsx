import { Meta, Story } from "@storybook/react";
import { Button } from "antd";
import { useState } from "react";
import {
  AsurRaaPaymentModal,
  AsurRaaPaymentModalProps,
  AsurRaaPaymentModalProvider,
} from "./index";

export default {
  component: AsurRaaPaymentModal,
  title: "Components/Modal",
} as Meta;

const Template: Story<AsurRaaPaymentModalProps> = (args) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <AsurRaaPaymentModalProvider khrExchangeRate={4000}>
      <Button onClick={() => setOpenModal(true)}>Open Modal</Button>
      <AsurRaaPaymentModal
        // @ts-ignore
        visible={openModal}
        {...args}
      />
    </AsurRaaPaymentModalProvider>
  );
};
export const Primary = Template.bind({});

Primary.args = {};
