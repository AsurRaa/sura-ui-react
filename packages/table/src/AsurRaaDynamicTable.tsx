import React from "react";
import { FC } from "react";
import { AsurRaaTable } from "./AsurRaaTable";
import { calculateColumnsWidthHelperFun } from "./helper/DynamicColumnsHelper";
import { AsurRaaDynamicTableProps } from "./interface";

export const AsurRaaDynamicTable: FC<AsurRaaDynamicTableProps> = (props) => {
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
      data={generateDataTable.source}
      asurRaaColumnProps={columnMerge}
      noActionColumn={true}
      antdTableProps={{
        rowKey: props.rowKey,
        scroll: { x: generateDataTable.tableWidth, y: props.tableHeight },
        ...props.antdTableProps,
      }}
    />
  );
};

AsurRaaDynamicTable.defaultProps = {
  maxWidthPerCell: 600,
  tableHeight: 500,
  rowKey: "id",
};
