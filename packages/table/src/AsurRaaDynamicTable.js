var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from "react";
import { AsurRaaTable } from "./AsurRaaTable";
import { calculateColumnsWidthHelperFun } from "./helper/DynamicColumnsHelper";
export var AsurRaaDynamicTable = function (props) {
    var _a;
    var generateDataTable = calculateColumnsWidthHelperFun({
        columns: props.asurRaaColumnProps,
        source: props.data,
        maxWidthPerCell: props.maxWidthPerCell,
        selectDynamicBase: props.dynamicWidthBaseColumn
    });
    var columnMerge = (_a = generateDataTable.columns) === null || _a === void 0 ? void 0 : _a.map(function (column, index) {
        return __assign(__assign({}, column), props.asurRaaColumnProps[index]);
    });
    return (React.createElement(AsurRaaTable, { noNeedHeader: true, data: generateDataTable.source, asurRaaColumnProps: columnMerge, noActionColumn: true, antdTableProps: __assign({ rowKey: props.rowKey, scroll: { x: generateDataTable.tableWidth, y: props.tableHeight } }, props.antdTableProps) }));
};
AsurRaaDynamicTable.defaultProps = {
    maxWidthPerCell: 600,
    tableHeight: 500,
    rowKey: "id"
};
//# sourceMappingURL=AsurRaaDynamicTable.js.map