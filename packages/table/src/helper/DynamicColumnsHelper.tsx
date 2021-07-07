import { AsurRaaColumnsInterface } from "../interface";

// @ts-ignore
const getTextWidth = (text: string, font = "14px -apple-system") => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  // @ts-ignore
  font = context?.font;
  const metrics = context?.measureText(text);
  // @ts-ignore
  return Math.round(metrics.width + 80);
};

interface calculateColumnsWidthHelperFunInterface {
  columns: Array<AsurRaaColumnsInterface>;
  source: Array<any>;
  maxWidthPerCell: number | undefined;
  selectDynamicBase?: string | undefined;
}

export const calculateColumnsWidthHelperFun = (
  props: calculateColumnsWidthHelperFunInterface
) => {
  const maxWidthPerCell = props.maxWidthPerCell ?? 500;
  const columnsParsed = JSON.parse(JSON.stringify(props.columns));

  const columnsWithWidth: Array<any> = columnsParsed.map(
    (column: AsurRaaColumnsInterface) =>
      Object.assign(column, {
        // @ts-ignore
        width: getTextWidth(props.selectDynamicBase ?? column.title),
      })
  );

  props.source?.map((entry) => {
    columnsWithWidth.map((column: any, indexColumn: any) => {
      const columnWidth = column.width;
      const cellValue = Object.values(entry)[indexColumn];
      // @ts-ignore
      let cellWidth = getTextWidth(cellValue);
      if (cellWidth < columnWidth) cellWidth = columnWidth;
      if (cellWidth > maxWidthPerCell) cellWidth = maxWidthPerCell;
      columnsWithWidth[indexColumn].width = cellWidth;
    });
  });

  const tableWidth = columnsWithWidth
    .map((column: any) => column.width)
    .reduce((a: any, b: any) => {
      return a + b;
    });

  return {
    columns: columnsWithWidth,
    source: props.source,
    tableWidth,
  };
};
