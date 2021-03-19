/* eslint-disable indent */
import { ButtonProps } from "antd/lib/button";
import { MenuItemProps } from "antd/lib/menu/MenuItem";
import { ModalFuncProps } from "antd/lib/modal";
import { ColumnProps, TableProps } from "antd/lib/table";
import moment from "moment";
import React, {
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { CSVLink } from "react-csv";
import styled from "styled-components";
import { dateFormat } from "./constant";
import {
  CalendarOutlined,
  ColumnWidthOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  Loading3QuartersOutlined,
  PlusCircleOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Dropdown, Menu, Modal, Table } from "antd";
import Search from "antd/lib/input/Search";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";

/**
 * @Author @lyhourchhen
 * @see [@AsurRaa](https://asurraa.com)
 * @date 2021
 */

const PaddingWrapper = styled.div`
  padding-bottom: 20px;
`;

export enum AsurRaaComponentViewModeENUM {
  COLUMN,
  TABLE,
  CALENDER,
}
export interface AsurRaaColumnsInterface<T = any> extends ColumnProps<T> {
  dataIndex?: string;
}

interface refreshButtonProps extends ButtonProps {
  animate?: boolean;
}
export interface AsurRaaTableProps<T> {
  antdTableProps?: TableProps<T>;
  createButton?: ButtonProps | undefined;
  refreshButton?: refreshButtonProps | undefined;
  deleteActionButton?: (props: T) => ModalFuncProps | undefined;
  editActionButton?: (props: T) => MenuItemProps | undefined;
  asurRaaColumnProps: Array<AsurRaaColumnsInterface>;
  data: Array<T>;
  dataCSV?: Array<any> | undefined;
  viewDefault?: AsurRaaComponentViewModeENUM;
  renderOwnViewColumn?: (props: Array<T>) => JSX.Element | ReactNode;
  renderOwnViewCalender?: (props: Array<T>) => JSX.Element | ReactNode;
  renderMoreButtonHeader?: JSX.Element | ReactNode;
  hasDateFilter?: boolean;
  noNeedHeader?: boolean;
  searchData?: any;
  search?: (
    searchData: any
  ) => {
    action?: void;
  };
  customWidthActionColumn?: number;
  renderAnotherChildrenOnRightSide?: ReactNode | JSX.Element;
  onChangeViewMode?: (value: any) => void;
}

// * main
const AsurRaaTable = <T extends unknown>(
  props: AsurRaaTableProps<T>
): ReactElement | null => {
  const { t } = useTranslation();
  const [dataSource, setDataSource] = useState<any>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [viewMode, setViewMode] = useState<AsurRaaComponentViewModeENUM>(
    AsurRaaComponentViewModeENUM.TABLE
  );

  useEffect(() => {
    props?.onChangeViewMode?.(AsurRaaComponentViewModeENUM[viewMode]);
  }, [props, viewMode]);

  useEffect(() => {
    if (props.viewDefault === AsurRaaComponentViewModeENUM.COLUMN) {
      setViewMode(AsurRaaComponentViewModeENUM.COLUMN);
    } else if (props.viewDefault === AsurRaaComponentViewModeENUM.CALENDER) {
      setViewMode(AsurRaaComponentViewModeENUM.CALENDER);
    } else if (
      props.viewDefault === AsurRaaComponentViewModeENUM.TABLE ||
      props.viewDefault === undefined
    ) {
      setViewMode(AsurRaaComponentViewModeENUM.TABLE);
    }
  }, [props.viewDefault]);

  useEffect(() => {
    setDataSource(props.data);
  }, [props.data, props.refreshButton]);

  const deleteModal = (properties: any) => {
    Modal.confirm({
      ...props?.deleteActionButton?.(properties),
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      okText: "Sure",
      cancelText: "Dismiss",
    });
  };

  const menu = (properties: any) => (
    <Menu>
      {props.editActionButton === undefined ? null : (
        <Menu.Item
          {...props.editActionButton?.(properties)}
          key={uuid()}
          icon={<EditOutlined />}
        >
          {t("edit")}
        </Menu.Item>
      )}
      {props.deleteActionButton === undefined ? null : (
        <Menu.Item
          onClick={() => deleteModal(properties)}
          key={uuid()}
          icon={<DeleteOutlined />}
        >
          {t("delete")}
        </Menu.Item>
      )}
    </Menu>
  );

  const columns: Array<AsurRaaColumnsInterface> = [
    ...props.asurRaaColumnProps,
    {
      title: "Action",
      key: uuid(),
      fixed: "right",
      align: "center",
      width:
        props.customWidthActionColumn === undefined
          ? 40
          : props.customWidthActionColumn,
      ellipsis: true,
      render: (props) => {
        return (
          <Dropdown overlay={menu(props)} trigger={["click"]}>
            <Button>
              <DownOutlined />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  const ChangeViewMode = (
    <Menu>
      <Menu.Item
        onClick={() => setViewMode(AsurRaaComponentViewModeENUM.TABLE)}
        key={uuid()}
      >
        <TableOutlined /> Table
      </Menu.Item>
      {props.renderOwnViewColumn === undefined ? null : (
        <Menu.Item
          onClick={() => setViewMode(AsurRaaComponentViewModeENUM.COLUMN)}
          key={uuid()}
        >
          <ColumnWidthOutlined /> Column
        </Menu.Item>
      )}
      {props.renderOwnViewCalender === undefined ? null : (
        <Menu.Item
          onClick={() => setViewMode(AsurRaaComponentViewModeENUM.CALENDER)}
          key={uuid()}
        >
          <CalendarOutlined /> Calender
        </Menu.Item>
      )}
    </Menu>
  );

  const ComponentHeader = (): JSX.Element => {
    return (
      <PaddingWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            {props.createButton !== undefined ? (
              <Button {...props.createButton} style={{ marginRight: 20 }}>
                <PlusCircleOutlined />
                {t("add")}
              </Button>
            ) : null}
            {props.refreshButton !== undefined ? (
              <Button {...props.refreshButton} style={{ marginRight: 20 }}>
                <Loading3QuartersOutlined spin={props.refreshButton.animate} />
                {t("refresh")}
              </Button>
            ) : null}
            <>{props.renderMoreButtonHeader}</>
          </div>

          <div style={{ display: "flex" }}>
            {props.renderAnotherChildrenOnRightSide === undefined ? null : (
              <div style={{ marginRight: 20 }}>
                {props.renderAnotherChildrenOnRightSide}
              </div>
            )}
            {props.hasDateFilter !== undefined && (
              <DatePicker.RangePicker
                style={{ marginRight: 20 }}
                defaultValue={[
                  moment("2019-09-03", dateFormat),
                  moment("2019-11-22", dateFormat),
                ]}
                disabled={[false, true]}
              />
            )}
            {props.renderOwnViewColumn === undefined &&
            props.renderOwnViewCalender === undefined ? null : (
              // eslint-disable-next-line indent
              <Fragment>
                <Dropdown overlay={ChangeViewMode} trigger={["click"]}>
                  <Button style={{ marginRight: 20 }}>
                    {t("view as")} <DownOutlined />
                  </Button>
                </Dropdown>
              </Fragment>
            )}

            {props.dataCSV !== undefined ? (
              <div>
                <CSVLink data={props?.dataCSV} filename={"data.csv"}>
                  <Button style={{ marginRight: 20 }}>{t("export CSV")}</Button>
                </CSVLink>
              </div>
            ) : null}
            <Search
              allowClear
              placeholder="Search"
              disabled={
                viewMode !== AsurRaaComponentViewModeENUM.TABLE ? true : false
              }
              onSearch={(search) => {
                console.log("onSearch", search);
                props?.search?.(search);
              }}
              style={{ width: 200 }}
            />
          </div>
        </div>
      </PaddingWrapper>
    );
  };

  const ViewAsTable = (): JSX.Element => {
    return (
      <Fragment>
        <Table
          // @ts-ignore
          columns={columns}
          bordered={true}
          dataSource={
            props.searchData === null || props.searchData === undefined
              ? dataSource
              : props.searchData
          }
          scroll={{ x: 1500 }}
          {...props.antdTableProps}
        />
      </Fragment>
    );
  };

  const ViewAsColumn = (): JSX.Element => {
    return (
      <Fragment>
        {props.renderOwnViewColumn === undefined ? (
          <p>Column should be render by yourself</p>
        ) : (
          props?.renderOwnViewColumn?.(props.data)
        )}
      </Fragment>
    );
  };

  const ViewAsCalender = (): JSX.Element => {
    return (
      <Fragment>
        {props.renderOwnViewCalender === undefined ? (
          <p>Calender should be render by yourself</p>
        ) : (
          props?.renderOwnViewCalender?.(props.data)
        )}
      </Fragment>
    );
  };

  return (
    <Fragment>
      {props.noNeedHeader ? null : <ComponentHeader />}
      {viewMode === AsurRaaComponentViewModeENUM.COLUMN ? (
        <ViewAsColumn />
      ) : viewMode === AsurRaaComponentViewModeENUM.CALENDER ? (
        <ViewAsCalender />
      ) : (
        <ViewAsTable />
      )}
    </Fragment>
  );
};

export default AsurRaaTable;
