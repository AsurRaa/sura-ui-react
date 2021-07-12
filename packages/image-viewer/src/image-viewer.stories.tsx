import { Meta, Story } from "@storybook/react";
import {
  AsurRaaImageViewer,
  AsurRaaImageViewerProps,
  AsurRaaImageViewerProvider,
} from "./index";
export default {
  component: AsurRaaImageViewer,
  title: "Components/ImageViewer",
} as Meta;

const Template: Story<AsurRaaImageViewerProps> = (args) => {
  const fallbackImageCdn =
    "https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg";
  const url = "https://fossbytes.com/wp-content/uploads/2021/06/";
  return (
    <AsurRaaImageViewerProvider fallbackImage={fallbackImageCdn} imageUrl={url}>
      <AsurRaaImageViewer
        isPreview={true}
        value={"rick-and-morty-s5-5-768x512.jpg"}
        {...args}
      />
    </AsurRaaImageViewerProvider>
  );
};

export const Primary = Template.bind({});

Primary.args = {};
