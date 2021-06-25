/* eslint-disable indent */
import React from "react";
import { InputNumber, InputNumberProps } from "antd";
import { FC, Fragment } from "react";
import styled from "styled-components";

export interface AsurRaaInputNumberProps extends InputNumberProps {
  currency?: "KHR" | "USD";
}

export const AsurRaaInputMoney: FC<AsurRaaInputNumberProps> = (props) => {
  const generateCurrencySymbol = (
    currency: AsurRaaInputNumberProps["currency"]
  ) => {
    switch (currency) {
      case "KHR":
        return "៛";
      case "USD":
        return "$";
      default:
        return "$";
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
        {props.size === "small" ? (
          <AddListIconSmallSize>
            {generateCurrencySymbol(props.currency)}
          </AddListIconSmallSize>
        ) : props.size === "large" ? (
          <AddListIconBigSize>
            {generateCurrencySymbol(props.currency)}
          </AddListIconBigSize>
        ) : (
          <AddListIconMiddleSize>
            {generateCurrencySymbol(props.currency)}
          </AddListIconMiddleSize>
        )}
        <InputNumber
          min={0}
          size={"middle"}
          // precision={2}
          // step={0.1}
          type="number,string"
          style={{ width: "100%" }}
          {...props}
        />
      </div>
    </Fragment>
  );
};

AsurRaaInputMoney.defaultProps = {
  currency: "USD",
};

const AddListIconBigSize = styled.div`
  width: 30px;
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px !important;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddListIconMiddleSize = styled.div`
  width: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 8px;
  padding-right: 8px;
  border: 1px solid #d9d9d9;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px !important;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddListIconSmallSize = styled.div`
  width: 30px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 8px;
  padding-right: 8px;
  border: 1px solid #d9d9d9;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px !important;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
