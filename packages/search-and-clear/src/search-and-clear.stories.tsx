import { Meta, Story } from "@storybook/react";
import { AsurRaaSearchAndClear, AsurRaaSearchAndClearProps } from "./index";
export default {
  component: AsurRaaSearchAndClear,
  title: "Components/SearchAndClear",
} as Meta;

const Template: Story<AsurRaaSearchAndClearProps> = (args) => {
  return <AsurRaaSearchAndClear {...args} />;
};

export const Primary = Template.bind({});

Primary.args = {};
