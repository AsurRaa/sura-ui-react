import { Input, InputProps } from "antd";
import React, { ChangeEventHandler, Fragment } from "react";
import InputMask from "react-input-mask";
import voca from "voca";

// **
// * @descriptions - using mask as Phone input integrate with andInput
// * @see - https://codesandbox.io/s/antd-formitem-as-component-wreact-input-mask-working-forked-kgjkt?file=/src/index.js
// **

export interface AsurRaaMiniPhoneInputProps {
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  defaultValue?: InputProps["defaultValue"];
  antdInputProps?: InputProps;
}

// * Utility
export const getTrimValueInAsurRaaMiniPhoneInputComponent = (value: string) => {
  const trim_ = voca.trim(value, "_");
  const trimWhiteSpace = trim_.replace(/\s/g, "");
  return trimWhiteSpace;
};

export const AsurRaaMiniPhoneInput: React.FC<AsurRaaMiniPhoneInputProps> = (
  props
) => {
  return (
    <Fragment>
      <InputMask
        mask="+855\ 99 999 9999"
        disabled={props.disabled}
        autoComplete="off"
        placeholder={" "}
        {...props}
      >
        <Input {...props.antdInputProps} />
      </InputMask>
    </Fragment>
  );
};
