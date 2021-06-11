import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Select, SelectProps } from "antd";
import { AxiosResponse } from "axios";
import styled from "styled-components";
import {
  Loading3QuartersOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React from "react";

/**
 * @author @lyhourchhen
 * @see [@AsurRaa](https://asurraa.com)
 * @date 2021
 * @components SelectSearchBaseApi
 * @description  search and infinite scrolling for select from api.
 */

export interface AsurRaaSelectSearchBaseApiProps<T> extends SelectProps<any> {
  uriData: string;
  onSelectExtend?: (value: T) => void;
  refreshButtonProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  addButtonProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  valueRender: Array<keyof T>;
}

export const AsurRaaSelectSearchBaseApi = <T extends { id: number }>(
  props: AsurRaaSelectSearchBaseApiProps<T>
) => {
  const [dataState, setDataState] = useState<Array<T>>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [meta, setMeta] = useState<{
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  }>({
    currentPage: 1,
    itemCount: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  });
  const searchParam = search === undefined ? "" : `&filter=${search}`;
  useEffect(() => {
    const url = `${props.uriData}?page=${page}${searchParam}`;
    axios.get(url).then((res: AxiosResponse<any>) => {
      setDataState(res.data.items);
      setMeta(res.data.meta);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const fetcher = () => {
    axios
      .get(`${props.uriData}?page=${page}${searchParam}`)
      .then((res: AxiosResponse<any>) => {
        setDataState([...dataState, ...res.data.items]);
      });
  };

  const onScroll = (event: any) => {
    const target = event.target;
    if (
      !loading &&
      target.scrollTop + target.offsetHeight + 5 >= target.scrollHeight &&
      page <= meta?.totalPages
    ) {
      setPage(page + 1);
      fetcher();
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Select
          filterOption={false}
          showSearch={true}
          onSearch={(value) => {
            setPage(1);
            setSearch(value);
          }}
          style={{ width: "100%" }}
          onPopupScroll={onScroll}
          defaultActiveFirstOption={true}
          {...props}
        >
          {loading ? (
            <LoadingOutlined />
          ) : (
            <Fragment>
              {dataState?.map((data, arrayIndex) => {
                return (
                  <Select.Option value={data.id} key={arrayIndex}>
                    <div
                      style={{ display: "flex" }}
                      onClick={() => props.onSelectExtend?.(data)}
                    >
                      {props?.valueRender?.map?.((value, index) => {
                        return (
                          <p style={{ paddingRight: 5 }} key={index}>
                            {dataState[arrayIndex][value]}
                          </p>
                        );
                      })}
                    </div>
                  </Select.Option>
                );
              })}
            </Fragment>
          )}
        </Select>
        {props.refreshButtonProps === undefined ? null : (
          <div {...props.refreshButtonProps}>
            <RefreshListIcon style={{ cursor: "pointer" }} />
          </div>
        )}
        {props.addButtonProps === undefined ? null : (
          <div {...props.addButtonProps}>
            <AddListIcon style={{ cursor: "pointer" }} />
          </div>
        )}
      </div>
    </Fragment>
  );
};

const RefreshListIcon = styled(Loading3QuartersOutlined)`
  margin-left: 10px;
  padding: 8px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-top-left-radius: 2px !important;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
`;

const AddListIcon = styled(PlusOutlined)`
  margin-left: 10px;
  padding: 8px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-top-left-radius: 2px !important;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
`;
