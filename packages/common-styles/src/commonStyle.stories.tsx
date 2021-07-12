import { Meta, Story } from "@storybook/react";
import { InputHeader } from "./index";
export default {
  component: InputHeader,
  title: "Components/common-style",
} as Meta;

const Template: Story<ReturnType<typeof InputHeader>> = (args) => {
  return <InputHeader {...args}>Test</InputHeader>;
};

export const Header = Template.bind({});

Header.args = {};
