import { Meta, Story } from "@storybook/react";
import { AsurRaaRichTextEditor, AsurRaaRichTextEditorProps } from "./index";
export default {
  component: AsurRaaRichTextEditor,
  title: "Components/RichTextEditor",
} as Meta;

const Template: Story<AsurRaaRichTextEditorProps> = (args) => {
  return <AsurRaaRichTextEditor {...args} />;
};

export const Primary = Template.bind({});

Primary.args = {};
