import { Meta, Story } from "@storybook/react";
import {
  AsurRaaSaleCard,
  AsurRaaSaleCardProps,
  AsurRaaSaleCardProvider,
} from "./index";
export default {
  component: AsurRaaSaleCard,
  title: "Components/SaleCard",
} as Meta;

const Template: Story<AsurRaaSaleCardProps> = (args) => {
  return (
    <AsurRaaSaleCardProvider
      fallbackImage={
        "https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg"
      }
      imageUrl=""
    >
      <AsurRaaSaleCard
        mainTitle="Coca"
        mainValueAtLeft={"HI"}
        mainValueAtRight={"Go"}
        {...args}
      />
    </AsurRaaSaleCardProvider>
  );
};

export const Primary = Template.bind({});

Primary.args = {};
