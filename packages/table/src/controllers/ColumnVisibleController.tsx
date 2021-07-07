import React, { useState, useMemo, FC } from "react";
import { Button, Dropdown, Menu, Checkbox } from "antd";

import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { ColumnTitle } from "antd/lib/table/interface";

export interface visibleColumnsInterface {
  visible: boolean;
  title: ColumnTitle<any>;
  dataIndex: string;
  printRender?: () => void;
}
export interface LiftedColumnVisibleControllerProps {
  trigger?: () => React.ReactNode;
}

interface ColumnVisibleControllerProps
  extends LiftedColumnVisibleControllerProps {
  setVisibleColumns: React.Dispatch<
    React.SetStateAction<visibleColumnsInterface[] | undefined>
  >;
  visibleColumns: visibleColumnsInterface[];
  tableName: string;
}
const dropdownContainerPrefix = "__dropdown-visible__";

// * main
const ColumnVisibleController: FC<ColumnVisibleControllerProps> = (props) => {
  const { visibleColumns, setVisibleColumns, trigger } = props;
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const renderMenus = () => {
    const checkboxGroupChange = (values: any) => {
      const newColumns = [...visibleColumns].map((item) => {
        const visible = values.some(
          (visibleCol: string) => visibleCol === item.dataIndex
        );
        return { ...item, visible };
      });

      setVisibleColumns(newColumns);
      localStorage.setItem(props.tableName, JSON.stringify(values));
    };

    const checkedCount = visibleColumns.reduce((acc, curr) => {
      return curr.visible ? acc + 1 : acc;
    }, 0);

    const checkboxAllChecked = visibleColumns.length === checkedCount;
    const checkboxAllIntermediate =
      checkedCount > 0 && checkedCount < visibleColumns.length;

    const checkboxAllOnChange = (e: CheckboxChangeEvent) => {
      const newVisibleColumns = visibleColumns.map((item) => ({
        ...item,
        visible: e.target.checked,
      }));
      setVisibleColumns(newVisibleColumns);
      const userColumnsVisibleConfig: string[] = e.target.checked
        ? visibleColumns.map((item) => item.dataIndex)
        : [];
      localStorage.setItem(
        props.tableName,
        JSON.stringify(userColumnsVisibleConfig)
      );
    };

    return (
      <div>
        <Checkbox.Group
          onChange={checkboxGroupChange}
          value={visibleColumns
            .filter((item) => item.visible)
            .map((item) => item.dataIndex)}
          style={{
            width: "100%",
          }}
        >
          <Menu
            style={{
              maxHeight: 300,
              overflowY: "auto",
            }}
          >
            {visibleColumns.map((item) => {
              return (
                <Menu.Item key={item.dataIndex}>
                  <Checkbox value={item.dataIndex}>{item.title}</Checkbox>
                </Menu.Item>
              );
            })}
          </Menu>
        </Checkbox.Group>
        <div
          style={{
            background: "#fff",
            padding: "8px 16px 8px 13px",
            border: "1px solid #eee",
            transform: "translateY(-5px)",
          }}
        >
          <Checkbox
            onChange={checkboxAllOnChange}
            checked={checkboxAllChecked}
            indeterminate={checkboxAllIntermediate}
          >
            Show all
          </Checkbox>
        </div>
      </div>
    );
  };

  const dropdownContainerId = useMemo(() => {
    return dropdownContainerPrefix + props.tableName;
  }, [props.tableName]);

  return (
    <div id={dropdownContainerId}>
      <Dropdown
        overlay={renderMenus()}
        trigger={["click"]}
        visible={dropdownVisible}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        getPopupContainer={() => document.getElementById(dropdownContainerId)!}
        onVisibleChange={(visible: any) => {
          setDropdownVisible(visible);
        }}
      >
        {trigger ? trigger() : <Button>Columns</Button>}
      </Dropdown>
    </div>
  );
};

export default ColumnVisibleController;
