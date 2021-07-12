import { Meta, Story } from "@storybook/react";
import { Typography } from "antd";
import { Fragment } from "react";
import { AsurRaaColorPicker, AsurRaaColorPickerProps } from "./index";
export default {
  component: AsurRaaColorPicker,
  title: "Components/ColorPicker",
} as Meta;

const Template: Story<AsurRaaColorPickerProps> = (args) => {
  return (
    <Fragment>
      <Typography.Text strong>Select Color here</Typography.Text>
      <AsurRaaColorPicker {...args} />
    </Fragment>
  );
};

export const Primary = Template.bind({});

Primary.args = {};
