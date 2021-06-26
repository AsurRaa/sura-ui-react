import React, { FC, useEffect, useState } from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

export interface AsurRaaColorPickerProps {
  onChange?: (haxColor: string) => void;
  value?: string;
  initValue?: string;
}

export const AsurRaaColorPicker: FC<AsurRaaColorPickerProps> = (props) => {
  const [color, setColor] = useState<any>("#000000");
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

  useEffect(() => {
    setColor(props.initValue);
    setColor(props.value);
  }, [props.initValue, props.value]);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: any) => {
    setColor(color.hex);
    props?.onChange?.(color.hex);
  };
  const styles = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: color,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div
          // @ts-ignore
          style={styles.popover}
        >
          <div
            // @ts-ignore
            style={styles.cover}
            onClick={handleClose}
          />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};
