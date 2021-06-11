import { Story, Meta } from "@storybook/react/types-6-0";
import AsurRaaSingleUpload, { AsurRaaSingleUploadProps } from "./AsurRaaUpload";
import { Button } from "antd";

export default {
  title: "Components/SingleUpload",
  component: AsurRaaSingleUpload,
} as Meta;

const Template: Story<AsurRaaSingleUploadProps> = (args) => (
  <AsurRaaSingleUpload {...args} />
);

export const Single = Template.bind({});
Single.args = {};
