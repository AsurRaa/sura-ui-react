import { Meta, Story } from "@storybook/react";
import { AsurRaaInputMoney, AsurRaaInputNumberProps } from "./index";
export default {
  component: AsurRaaInputMoney,
  title: "Components/InputMoney",
} as Meta;

const Template: Story<AsurRaaInputNumberProps> = (args) => {
  return <AsurRaaInputMoney {...args} />;
};

export const Primary = Template.bind({});

Primary.args = {};
