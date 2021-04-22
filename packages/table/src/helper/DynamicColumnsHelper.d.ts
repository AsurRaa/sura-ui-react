import { AsurRaaColumnsInterface } from "../interface";
interface calculateColumnsWidthHelperFunInterface {
    columns: Array<AsurRaaColumnsInterface>;
    source: Array<any>;
    maxWidthPerCell: number | undefined;
    selectDynamicBase?: string | undefined;
}
export declare const calculateColumnsWidthHelperFun: (props: calculateColumnsWidthHelperFunInterface) => {
    columns: any[];
    source: any[];
    tableWidth: any;
};
export {};
