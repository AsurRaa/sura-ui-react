import { Meta, Story } from "@storybook/react";
import { AsurRaaColorPicker, AsurRaaColorPickerProps } from "./index";
export default {
	component: AsurRaaColorPicker,
	title: "Components/ColorPicker",
} as Meta;

const Template: Story<AsurRaaColorPickerProps> = (args) => {
	return <AsurRaaColorPicker {...args} />;
};

export const Primary = Template.bind({});

Primary.args = {};
