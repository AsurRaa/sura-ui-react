 [![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://asurraa.github.io/sura-ui/)
 
# @asurraa/sura-ui-table 
> Extendable on top of AntdTable with mutiple functional and use Internally at AsuRaa.

```sh
yarn add @asurraa/sura-ui-table
```


## Props
|Property| Description |Type | Default|more|
|--|--|--|--|--|
| antdTableProps | all from antd table props | `TableProps`	| `antdTableProps: { bordered:  true }`	| [Tableprops's Details](https://ant.design/components/table/#Table)
|isCSV|Render button to download table data as **CSV**|`boolean`| `true`| [React-CSV's Details](https://github.com/react-csv/react-csv#readme)
|createButton|Render create button and it props|`ButtonProps`|`undefine`|[ButtonProps's Details](https://ant.design/components/button/#API)|
|refreshButton|Render refresh button and it props|`ButtonProps`|`undefine`|[ButtonProps's Details](https://ant.design/components/button/#API)|
|deleteButton|Render delete button and it props also with callback those props|`ModalFuncProps`|`undefine`|[ModalProps's Details](https://ant.design/components/modal/#API) [Example](https://github.com/AsurRaa/pos-gym-ui/tree/dev/src/components/asurraa-table#ExamplewithCallbackProps)|
asurRaaColumnProps|Column for table|`Array<AsurRaaColumnsInterface>`|`required`|[Example](https://github.com/AsurRaa/pos-gym-ui/tree/dev/src/components/asurraa-table#asurraacolumnprops)|
data|Data for table|`Array<any>`|`required`|[Example](https://github.com/AsurRaa/pos-gym-ui/tree/dev/src/components/asurraa-table#data)|


### asurRaaColumnProps
```ts
import {AsurRaaColumnsInterface} from  "@AsurRaa/Table";
const column: Array<AsurRaaColumnsInterface> = [{
	title:  "Full Name",
	width:  100,
	dataIndex:  "name",
	key:  "name",
	fixed:  "left",
},
```
### Data
```ts 
// Example 
const  data  = [
	{
	key:  1,
	name:  `Edrward 1`,
	age:  32,
	address:  `London Park no. 2`,
	},
	{
	key:  12,
	name:  `Edrward 12`,
	age:  32,
	address:  `London Park no. 22`,
	},
	{
	key:  31,
	name:  `Edrward 31`,
	age:  32,
	address:  `London Park no. 32`,
	},
];
```

## Example 
```ts
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
  //console.log("isError", isError);
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

### Example with Callback Props 
```ts 
<div>
    <AsurRaaTable
      deleteActionButton={(props) => ({
        onOk: () => //console.log("props with delete", props),
      })}
    />
</div>
```

