import * as React from "react";

interface Props {
  text: string;
}

export const TableComponents = ({ text }: Props) => {
  return <div>Table Components: {text}</div>;
};
