import { FC } from "react";
import { calculateColumnsWidthHelperFun } from "./helper/DynamicColumnsHelper";
import { AsurRaaTableProps } from "./AsurRaaTable";
import React from "react";
import { AsurRaaColumnsProps, AsurRaaTable } from "./AsurRaaTable";
export interface AsurRaaDynamicTableInterface extends AsurRaaTableProps<any> {
  isDynamicColumnWidth?: boolean;
  rowKey?: string;
  tableHeight?: number;
  maxWidthPerCell?: number;
  dynamicWidthBaseColumn?: keyof AsurRaaColumnsProps;
}

export const AsurRaaDynamicTable: FC<AsurRaaDynamicTableInterface> = (
  props
) => {
  const generateDataTable = calculateColumnsWidthHelperFun({
    columns: props.asurRaaColumnProps,
    source: props.data,
    maxWidthPerCell: props.maxWidthPerCell,
    selectDynamicBase: props.dynamicWidthBaseColumn,
  });

  const columnMerge = generateDataTable.columns?.map((column, index) => {
    return {
      ...column,
      ...props.asurRaaColumnProps[index],
    };
  });

  return (
    <AsurRaaTable
      noNeedHeader={true}
      noActionColumn={true}
      antdTableProps={{
        rowKey: props.rowKey,
        scroll: { x: generateDataTable.tableWidth, y: props.tableHeight },
        ...props.antdTableProps,
      }}
      {...props}
      data={generateDataTable.source}
      asurRaaColumnProps={columnMerge}
    />
  );
};

AsurRaaDynamicTable.defaultProps = {
  maxWidthPerCell: 600,
  tableHeight: 500,
  rowKey: "id",
};
