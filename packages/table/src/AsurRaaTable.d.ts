import { ReactElement } from "react";
import { AsurRaaTableProps } from "./interface";
export declare enum AsurRaaComponentViewModeENUM {
    COLUMN = 0,
    TABLE = 1,
    CALENDER = 2
}
declare const AsurRaaTable: <T extends unknown>(props: AsurRaaTableProps<T>) => ReactElement | null;
export { AsurRaaTable };
