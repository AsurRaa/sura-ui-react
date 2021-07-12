import { Meta, Story } from "@storybook/react";
import { Select } from "antd";
import { AsurRaaSelect, AsurRaaSelectProps } from "./index";
export default {
	component: AsurRaaSelect,
	title: "Components/Select",
} as Meta;

const Template: Story<AsurRaaSelectProps> = (args) => {
	const Cart = ["car", "monkey", "mengleang"];
	return (
		<AsurRaaSelect {...args}>
			{Cart.map((data) => {
				return <Select.Option value={data}>{data}</Select.Option>;
			})}
		</AsurRaaSelect>
	);
};

export const Primary = Template.bind({});

Primary.args = {};
