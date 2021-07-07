[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://asurraa.github.io/sura-ui/)

# @asurraa/sura-ui-table

> Extendable on top of AntdTable with multiple functional and use Internally at AsuRaa.

```sh
yarn add @asurraa/sura-ui-table
```

### Installation

1. Wrap Provider

```tsx
// app.tsx
import react from "react";
import { AsurRaaTableProvider } from "@asurraa/sura-ui/table";

const App = () => {
  return (
    <div>
      <AsurRaaTableProvider>
        <Page />
      </AsurRaaTableProvider>
    </div>
  );
};
```

2. Table Usages

```tsx
import { Tag } from "antd";
import React from "react";
import AsurRaaTable, {
  AsurRaaColumnsInterface,
} from "../../components/asurraa-table/AsurRaaTable";
import {
  useGetAllProduct,
  refreshProductServices,
} from "../../services/product.service";

const ServicesPage = () => {
  const { data, isError, isLoading } = useGetAllProduct();
  const column: Array<AsurRaaColumnsInterface> = [
    {
      title: "Product Name",
      width: 100,
      dataIndex: "productname",
      key: "name",
      fixed: "left",
    },
    {
      title: "Quantity",
      width: 100,
      dataIndex: "quantity",
      key: "quantity",
      // fixed: "left",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      width: 150,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "3",
      width: 150,
      render: (props) => {
        //console.log("props", props);
        return <Tag>{props.toString()}</Tag>;
      },
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "4",
      width: 150,
    },
  ];

  return (
    <div>
      <AsurRaaTable
        antdTableProps={{ bordered: true, loading: isLoading }}

        createButton={{
          onClick: () => //console.log("hi"),
        }}
        refreshButton={{
          onClick: () => refreshProductServices(),
        }}
        deleteActionButton={(props) => ({

          onOk: () => //console.log("props with delete", props),
        })}
        asurRaaColumnProps={column}
        data={data?.data}
      />
    </div>
  );
};

export default ServicesPage;
```
