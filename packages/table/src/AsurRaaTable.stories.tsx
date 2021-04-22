import { Story, Meta } from "@storybook/react/types-6-0";
import React from "react";
import { AsurRaaTable, AsurRaaTableProps } from ".";

export default {
  title: "Components/DynamicTable",
  component: AsurRaaTable,
} as Meta;

const Template: Story<AsurRaaTableProps<any>> = (args) => (
  <AsurRaaTable {...args} />
);

export const Primary = Template.bind({});
const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

Primary.args = {
  asurRaaColumnProps: columns,
  data: dataSource,
};
