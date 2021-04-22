var getTextWidth = function (text) {
    if (text === void 0) { text = "14px -apple-system"; }
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    // @ts-ignore
    font = context === null || context === void 0 ? void 0 : context.font;
    var metrics = context === null || context === void 0 ? void 0 : context.measureText(text);
    // @ts-ignore
    return Math.round(metrics.width + 80);
};
export var calculateColumnsWidthHelperFun = function (props) {
    var _a, _b;
    var maxWidthPerCell = (_a = props.maxWidthPerCell) !== null && _a !== void 0 ? _a : 500;
    var columnsParsed = JSON.parse(JSON.stringify(props.columns));
    var columnsWithWidth = columnsParsed.map(function (column) {
        var _a;
        return Object.assign(column, {
            // @ts-ignore
            width: getTextWidth((_a = props.selectDynamicBase) !== null && _a !== void 0 ? _a : column.title)
        });
    });
    (_b = props.source) === null || _b === void 0 ? void 0 : _b.map(function (entry) {
        columnsWithWidth.map(function (column, indexColumn) {
            var columnWidth = column.width;
            var cellValue = Object.values(entry)[indexColumn];
            // @ts-ignore
            var cellWidth = getTextWidth(cellValue);
            if (cellWidth < columnWidth)
                cellWidth = columnWidth;
            if (cellWidth > maxWidthPerCell)
                cellWidth = maxWidthPerCell;
            columnsWithWidth[indexColumn].width = cellWidth;
        });
    });
    var tableWidth = columnsWithWidth
        .map(function (column) { return column.width; })
        .reduce(function (a, b) {
        return a + b;
    });
    return {
        columns: columnsWithWidth,
        source: props.source,
        tableWidth: tableWidth
    };
};
//# sourceMappingURL=DynamicColumnsHelper.js.map