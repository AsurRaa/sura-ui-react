import { ButtonProps } from "antd";
import { ColumnProps } from "antd/lib/table";

export enum AsurRaaTableComponentViewModeENUM {
  COLUMN,
  TABLE,
  CALENDER,
}
export interface AsurRaaColumnsInterface<T = any> extends ColumnProps<T> {
  dataIndex?: string;
}
export interface refreshButtonProps extends ButtonProps {
  animate?: boolean;
}
