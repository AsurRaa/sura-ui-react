import { Story, Meta } from "@storybook/react/types-6-0";
import React from "react";
import { AsurRaaDynamicTable, AsurRaaDynamicTableProps } from ".";

export default {
  title: "Components/Table",
  component: AsurRaaDynamicTable,
} as Meta;

const Template: Story<AsurRaaDynamicTableProps> = (args) => (
  <AsurRaaDynamicTable {...args} />
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
