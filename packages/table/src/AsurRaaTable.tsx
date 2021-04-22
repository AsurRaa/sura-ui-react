/* eslint-disable indent */
import { Popover } from "antd";
import moment from "moment";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import styled from "styled-components";
import {
  CalendarOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  ColumnWidthOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  Loading3QuartersOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Dropdown, Menu, Modal, Table } from "antd";
import Search from "antd/lib/input/Search";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import Checkbox from "antd/lib/checkbox/Checkbox";
import React from "react";
import { Flexbox } from "./styles/common.style";
import { dateAsurRaaFormatOnlyDateNotWithTime } from "./constant";
import { AsurRaaColumnsProps, AsurRaaTableProps } from "./interface";

/**
 * @author @lyhourchhen
 * @see [@AsurRaa](https://asurraa.com)
 * @date 2021
 */

const PaddingWrapper = styled.div`
  padding-bottom: 20px;
`;

// * Interface

export enum AsurRaaComponentViewModeENUM {
  COLUMN,
  TABLE,
  CALENDER,
}

// * main
const AsurRaaTable = <T extends unknown>(
  props: AsurRaaTableProps<T>
): ReactElement | null => {
  const { t } = useTranslation();
  const [pageChange, setPageChange] = useState<number | undefined>(1);
  const [dataSource, setDataSource] = useState<any>();
  const [popOverCSVState, setPopOverCSVState] = useState<boolean>(false);
  const [visibleDropdownState, setVisibleDropdownState] = useState<boolean>(
    false
  );
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

  const deleteModal = (properties: T) => {
    Modal.confirm({
      ...props?.deleteActionButton?.(properties),
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      okText: "Sure",
      cancelText: "Dismiss",
    });
  };

  const menu = (properties: T) => (
    <Menu>
      {props.detailActionButton === undefined ? null : (
        <Menu.Item
          {...props.detailActionButton?.(properties)}
          key={uuid()}
          icon={<EyeOutlined />}
        >
          {props.detailActionText === undefined
            ? t("View Detail")
            : t(props.detailActionText)}
        </Menu.Item>
      )}
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

  const actionColumnObj: AsurRaaColumnsProps<T> = {
    title: "Action",
    key: "action",
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
  };
  const NOColumnObj: AsurRaaColumnsProps<T> = {
    title: "N.O",
    key: "no",
    fixed: "right",
    align: "center",
    width: 20,
    ellipsis: true,
    render: (_value, _props, index) => {
      const calculatePage = (index: number) => {
        if (pageChange === 1 || pageChange === undefined) {
          return index + 1;
        } else {
          return (pageChange - 1) * 10 + index + 1;
        }
      };
      return <p>{calculatePage(index)}</p>;
    },
  };

  const columnsWithAction: Array<AsurRaaColumnsProps<T>> = [
    NOColumnObj,
    ...props.asurRaaColumnProps,
    actionColumnObj,
  ];
  const columnsNoAction: Array<AsurRaaColumnsProps<T>> = [
    ...props.asurRaaColumnProps,
  ];

  const mergeColumns = props.noActionColumn
    ? columnsNoAction
    : columnsWithAction;

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

  const visibleMenu = (
    <Menu>
      {props.asurRaaColumnProps?.map((column, index) => {
        return (
          <Menu.Item key={index}>
            <Checkbox onChange={(value) => console.log("log value", value)}>
              {column.title}
            </Checkbox>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const ComponentHeader = (): JSX.Element => {
    return (
      <PaddingWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <div style={{ display: "flex" }}>
            <div>
              {props.createButton !== undefined ? (
                <Button {...props.createButton} style={{ marginRight: 20 }}>
                  <PlusCircleOutlined />
                  {t("add")}
                </Button>
              ) : null}
              {props.refreshButton !== undefined ? (
                <Fragment>
                  <Button {...props.refreshButton} style={{ marginRight: 20 }}>
                    <Loading3QuartersOutlined
                      spin={props.refreshButton.animate}
                    />
                    {t("refresh")}
                  </Button>
                </Fragment>
              ) : null}
            </div>
            <div>
              {props?.renderMoreButtonHeader === undefined
                ? null
                : props?.renderMoreButtonHeader}
            </div>
          </div>
          <div style={{ display: "flex" }}>
            {props.renderAnotherChildrenOnRightSide === undefined ? null : (
              <div style={{ marginRight: 20 }}>
                {props.renderAnotherChildrenOnRightSide}
              </div>
            )}
            {props.onChangeFilterDataDate !== undefined && (
              <DatePicker.RangePicker
                onChange={(value) => {
                  const formatStartDate = moment(value?.[0]).format(
                    dateAsurRaaFormatOnlyDateNotWithTime
                  );
                  const formatEndDate = moment(value?.[1]).format(
                    dateAsurRaaFormatOnlyDateNotWithTime
                  );
                  const formatDate = [formatStartDate, formatEndDate];

                  props?.onChangeFilterDataDate?.(formatDate, value);
                }}
                allowClear
                style={{ marginRight: 20 }}
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

            {props.dataAllCSV !== undefined ||
            props.dataFilterCSV !== undefined ? (
              <div>
                <Popover
                  placement="bottom"
                  content={
                    <Fragment>
                      {props.dataAllCSV !== undefined ? (
                        <CSVLink
                          data={props?.dataAllCSV}
                          filename={"all-data.csv"}
                        >
                          <a>All Data</a>
                        </CSVLink>
                      ) : null}
                      {props.dataFilterCSV !== undefined ? (
                        <CSVLink
                          data={props?.dataFilterCSV}
                          filename={"filtered-data.csv"}
                        >
                          <br />
                          <a>Filtered Data</a>
                        </CSVLink>
                      ) : null}
                    </Fragment>
                  }
                  title={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>Export CSV</div>
                      <div>
                        <CloseCircleOutlined
                          onClick={() => setPopOverCSVState(false)}
                        />
                      </div>
                    </div>
                  }
                  trigger="click"
                  visible={popOverCSVState}
                  onVisibleChange={() => setPopOverCSVState(true)}
                >
                  <Button style={{ marginRight: 20 }}>{t("export CSV")}</Button>
                </Popover>
              </div>
            ) : null}
            {/* Visible Column*/}
            {props.isVisibleColumn !== undefined ? (
              <div>
                <Dropdown
                  overlay={visibleMenu}
                  trigger={["click"]}
                  visible={visibleDropdownState}
                  onVisibleChange={(visible: boolean) => {
                    setVisibleDropdownState(visible);
                  }}
                >
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Button style={{ marginRight: 20 }}>Visible Column</Button>
                  </a>
                </Dropdown>
              </div>
            ) : null}

            {props.onSearchResult !== undefined ||
            props.onSearchResult === true ? (
              <Fragment>
                <Search
                  placeholder="Search"
                  onChange={(e) => {
                    const searchValue = e.target.value;
                    if (searchValue.length === 0) {
                      props?.onSearchClear?.();
                    }
                  }}
                  onSearch={(search) => {
                    props?.onSearchResult?.(search);
                  }}
                  style={{ width: 200 }}
                />
                <Fragment>
                  {props.onSearchClear === undefined ? null : (
                    <Button
                      style={{ width: 10, marginLeft: "-2px" }}
                      {...props?.onSearchClear?.()}
                    >
                      <Flexbox>
                        <CloseOutlined />
                      </Flexbox>
                    </Button>
                  )}
                </Fragment>
              </Fragment>
            ) : null}
          </div>
        </div>
      </PaddingWrapper>
    );
  };

  // * Main Table
  const ViewAsTable = (): JSX.Element => {
    return (
      <Fragment>
        <Table
          // @ts-ignore
          columns={mergeColumns}
          dataSource={dataSource}
          scroll={{ x: 1500 }}
          {...props.antdTableProps}
          bordered={true}
          loading={{
            // @ts-ignore // default={false}
            spinning: props.antdTableProps?.loading ?? false,
            indicator: (
              <Flexbox>
                <LoadingOutlined
                  style={{
                    fontSize: 30,
                  }}
                  spin
                />
              </Flexbox>
            ),
          }}
          onChange={(pagination) => setPageChange(pagination.current)}
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

export { AsurRaaTable };
