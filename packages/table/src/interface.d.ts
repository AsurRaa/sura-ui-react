import { ButtonProps, MenuItemProps, ModalFuncProps, TableProps } from "antd";
import { ColumnProps } from "antd/lib/table";
import { ReactNode } from "react";
export interface AsurRaaColumnsProps<T = any> extends ColumnProps<T> {
    dataIndex?: string;
}
export interface refreshButtonProps extends ButtonProps {
    animate?: boolean;
}
export interface AsurRaaTableProps<T> {
    antdTableProps?: TableProps<T>;
    createButton?: ButtonProps | undefined;
    refreshButton?: refreshButtonProps | undefined;
    asurRaaColumnProps: Array<AsurRaaColumnsProps>;
    data: Array<T>;
    dataAllCSV?: Array<any> | undefined;
    dataFilterCSV?: Array<any> | undefined;
    viewDefault?: AsurRaaComponentViewModeENUM;
    renderMoreButtonHeader?: JSX.Element | ReactNode;
    noNeedHeader?: boolean;
    customWidthActionColumn?: number;
    renderAnotherChildrenOnRightSide?: ReactNode | JSX.Element;
    noActionColumn?: boolean;
    detailActionText?: string;
    isVisibleColumn?: boolean;
    noNoColumn?: boolean;
    detailActionButton?: (props: T) => MenuItemProps | undefined;
    deleteActionButton?: (props: T) => ModalFuncProps | undefined;
    editActionButton?: (props: T) => MenuItemProps | undefined;
    renderOwnViewColumn?: (props: Array<T>) => JSX.Element | ReactNode;
    renderOwnViewCalender?: (props: Array<T>) => JSX.Element | ReactNode;
    onSearchResult?: (searchData: any) => void;
    onSearchClear?: () => ButtonProps | undefined;
    onChangeViewMode?: (value: any) => void;
    onChangeFilterDataDate?: (value: Array<string>, momentProps: any) => void;
}
export interface AsurRaaDynamicTableProps extends AsurRaaTableProps<any> {
    isDynamicColumnWidth?: boolean;
    rowKey?: string;
    tableHeight?: number;
    maxWidthPerCell?: number;
    dynamicWidthBaseColumn?: keyof AsurRaaColumnsProps;
}
export declare enum AsurRaaComponentViewModeENUM {
    COLUMN = 0,
    TABLE = 1,
    CALENDER = 2
}
export interface AsurRaaColumnsInterface<T = any> extends ColumnProps<T> {
    dataIndex?: string;
}
export interface refreshButtonProps extends ButtonProps {
    animate?: boolean;
}
