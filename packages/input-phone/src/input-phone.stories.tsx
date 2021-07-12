import { Meta, Story } from "@storybook/react";
import { AsurRaaMiniPhoneInput, AsurRaaMiniPhoneInputProps } from "./index";
export default {
  component: AsurRaaMiniPhoneInput,
  title: "Components/InputPhone",
} as Meta;

const Template: Story<AsurRaaMiniPhoneInputProps> = (args) => {
  return <AsurRaaMiniPhoneInput {...args} />;
};

export const Primary = Template.bind({});

Primary.args = {};
