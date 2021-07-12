import { Meta, Story } from "@storybook/react";
import {
  AsurRaaInlineWeekDayPicker,
  AsurRaaInlineWeekDayPickerProps,
} from "./index";
export default {
  component: AsurRaaInlineWeekDayPicker,
  title: "Components/WeekDayPicker",
} as Meta;

const Template: Story<AsurRaaInlineWeekDayPickerProps> = (args) => {
  return <AsurRaaInlineWeekDayPicker {...args} />;
};

export const Primary = Template.bind({});

Primary.args = {};
