import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  AsurRaaColumnsProps,
  AsurRaaTable,
  AsurRaaTableProps,
} from "./AsurRaaTable";

export default {
  component: AsurRaaTable,
  title: "Components/Table",
} as Meta;

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

type dataSourceType = typeof dataSource[0];

const columns: AsurRaaColumnsProps<dataSourceType>[] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "50px",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: "50px",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    width: "50px",
  },
];

const Template: Story<AsurRaaTableProps<dataSourceType>> = (args) => {
  return <AsurRaaTable {...args} />;
};

export const Primary = Template.bind({});

Primary.args = {
  data: dataSource,
  asurRaaColumnProps: columns,
  antdTableProps: { bordered: true },
};
