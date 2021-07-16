import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  AsurRaaColumnsProps,
  AsurRaaTable,
  AsurRaaTableProps,
} from "./AsurRaaTable";
import { AsurRaaTableProvider } from "./AsurRaaTableProvider";
import { useEffect } from "react";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Tag } from "antd";
export default {
  component: AsurRaaTable,
  title: "Components/Table",
} as Meta;

interface DotaTeamInterface {
  team_id: number;
  rating: number;
  wins: number;
  losses: number;
  last_match_time: number;
  name: string;
  tag: string;
  logo_url: string;
}

const TableColumn: Array<AsurRaaColumnsProps<DotaTeamInterface>> = [
  {
    title: "Logo",
    key: "logo",
    dataIndex: "logo_url",
    width: "50px",
    align: "center",
    render: (value) => <img width={70} height={70} src={value} />,
  },
  { title: "Name", key: "name", dataIndex: "name", width: "50px" },
  {
    title: "Tag",
    key: "tag",
    dataIndex: "tag",
    width: "50px",
    render: (value) => <Tag color={"blue"}>{value}</Tag>,
  },
  {
    title: "Wins",
    key: "wins",
    dataIndex: "wins",
    width: "50px",
    render: (value) => <Tag color={"green"}>{value}</Tag>,
  },
  {
    title: "Losses",
    key: "losses",
    dataIndex: "losses",
    width: "50px",
    render: (value) => <Tag color={"red"}>{value}</Tag>,
  },

  {
    title: "Rating",
    key: "rating",
    dataIndex: "rating",
    width: "50px",
    render: (value) => <Tag>{value}</Tag>,
  },
];

const Template: Story<AsurRaaTableProps<DotaTeamInterface>> = (args) => {
  const [data, setData] = useState<Array<DotaTeamInterface>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    axios
      .get("https://api.opendota.com/api/teams")
      .then((res: AxiosResponse<DotaTeamInterface[]>) => {
        setData(res.data);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <AsurRaaTableProvider formateDate={"DD-MM-YYYY"}>
      <AsurRaaTable<DotaTeamInterface>
        {...args}
        data={data}
        asurRaaColumnProps={TableColumn}
        antdTableProps={{ loading: loading }}
        detailActionButton={() => ({
          onClick: () => {},
        })}
      />
    </AsurRaaTableProvider>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  antdTableProps: { bordered: true },
};
