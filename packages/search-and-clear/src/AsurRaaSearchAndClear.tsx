import React, { FC } from "react";
import {
  CloseOutlined,
  Loading3QuartersOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, ButtonProps, Tooltip } from "antd";
import Search, { SearchProps } from "antd/lib/input/Search";
import styled from "styled-components";

const Flexbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface AsurRaaSearchAndClearProps extends SearchProps {
  clearButtonProps?: ButtonProps;
  refreshButtonProps?: ButtonProps;
  addButtonProps?: ButtonProps;
  size?: "large" | "small" | "middle";
}

export const AsurRaaSearchAndClear: FC<AsurRaaSearchAndClearProps> = (
  props
) => {
  return (
    <div style={{ display: "flex" }}>
      {props.addButtonProps === undefined ? null : (
        <Tooltip title="create customer">
          <Button
            size={props.size}
            style={{ marginLeft: "-2px" }}
            {...props.addButtonProps}
          >
            <Flexbox>
              <PlusOutlined />
            </Flexbox>
          </Button>
        </Tooltip>
      )}
      {props.refreshButtonProps === undefined ? null : (
        <Button
          size={props.size}
          style={{ marginLeft: "-2px" }}
          {...props.refreshButtonProps}
        >
          <Flexbox>
            <Loading3QuartersOutlined />
          </Flexbox>
        </Button>
      )}
      <Search {...props} size={props.size} />
      {props.clearButtonProps === undefined ? null : (
        <Button
          size={props.size}
          style={{ marginLeft: "-2px" }}
          {...props.clearButtonProps}
        >
          <Flexbox>
            <CloseOutlined />
          </Flexbox>
        </Button>
      )}
    </div>
  );
};
