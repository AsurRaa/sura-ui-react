import { Meta, Story } from "@storybook/react";
import {
  AsurRaaDropdownFilter,
  AsurRaaDropdownFilterProps,
  AsurRaaDropdownProvider,
} from "./index";
export default {
  component: AsurRaaDropdownFilter,
  title: "Components/DropdownFilter",
} as Meta;

const Template: Story<AsurRaaDropdownFilterProps> = (args) => {
  return (
    <AsurRaaDropdownProvider dateFormate="DD-MM-YYYY">
      <AsurRaaDropdownFilter {...args} />
    </AsurRaaDropdownProvider>
  );
};

export const Primary = Template.bind({});

Primary.args = {};
