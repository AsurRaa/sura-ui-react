var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
/* eslint-disable indent */
import { Popover } from "antd";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import styled from "styled-components";
import { CalendarOutlined, CloseCircleOutlined, CloseOutlined, ColumnWidthOutlined, DeleteOutlined, DownOutlined, EditOutlined, ExclamationCircleOutlined, EyeOutlined, Loading3QuartersOutlined, LoadingOutlined, PlusCircleOutlined, TableOutlined, } from "@ant-design/icons";
import { Button, DatePicker, Dropdown, Menu, Modal, Table } from "antd";
import Search from "antd/lib/input/Search";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import Checkbox from "antd/lib/checkbox/Checkbox";
import React from "react";
import { Flexbox } from "./styles/common.style";
import { dateAsurRaaFormatOnlyDateNotWithTime } from "./constant";
/**
 * @author @lyhourchhen
 * @see [@AsurRaa](https://asurraa.com)
 * @date 2021
 */
var PaddingWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding-bottom: 20px;\n"], ["\n  padding-bottom: 20px;\n"])));
// * Interface
export var AsurRaaComponentViewModeENUM;
(function (AsurRaaComponentViewModeENUM) {
    AsurRaaComponentViewModeENUM[AsurRaaComponentViewModeENUM["COLUMN"] = 0] = "COLUMN";
    AsurRaaComponentViewModeENUM[AsurRaaComponentViewModeENUM["TABLE"] = 1] = "TABLE";
    AsurRaaComponentViewModeENUM[AsurRaaComponentViewModeENUM["CALENDER"] = 2] = "CALENDER";
})(AsurRaaComponentViewModeENUM || (AsurRaaComponentViewModeENUM = {}));
// * main
var AsurRaaTable = function (props) {
    var _a;
    var t = useTranslation().t;
    var _b = useState(1), pageChange = _b[0], setPageChange = _b[1];
    var _c = useState(), dataSource = _c[0], setDataSource = _c[1];
    var _d = useState(false), popOverCSVState = _d[0], setPopOverCSVState = _d[1];
    var _e = useState(false), visibleDropdownState = _e[0], setVisibleDropdownState = _e[1];
    var _f = useState(AsurRaaComponentViewModeENUM.TABLE), viewMode = _f[0], setViewMode = _f[1];
    useEffect(function () {
        var _a;
        (_a = props === null || props === void 0 ? void 0 : props.onChangeViewMode) === null || _a === void 0 ? void 0 : _a.call(props, AsurRaaComponentViewModeENUM[viewMode]);
    }, [props, viewMode]);
    useEffect(function () {
        if (props.viewDefault === AsurRaaComponentViewModeENUM.COLUMN) {
            setViewMode(AsurRaaComponentViewModeENUM.COLUMN);
        }
        else if (props.viewDefault === AsurRaaComponentViewModeENUM.CALENDER) {
            setViewMode(AsurRaaComponentViewModeENUM.CALENDER);
        }
        else if (props.viewDefault === AsurRaaComponentViewModeENUM.TABLE ||
            props.viewDefault === undefined) {
            setViewMode(AsurRaaComponentViewModeENUM.TABLE);
        }
    }, [props.viewDefault]);
    useEffect(function () {
        setDataSource(props.data);
    }, [props.data, props.refreshButton]);
    var deleteModal = function (properties) {
        var _a;
        Modal.confirm(__assign(__assign({}, (_a = props === null || props === void 0 ? void 0 : props.deleteActionButton) === null || _a === void 0 ? void 0 : _a.call(props, properties)), { title: "Confirm", icon: React.createElement(ExclamationCircleOutlined, null), okText: "Sure", cancelText: "Dismiss" }));
    };
    var menu = function (properties) {
        var _a, _b;
        return (React.createElement(Menu, null,
            props.detailActionButton === undefined ? null : (React.createElement(Menu.Item, __assign({}, (_a = props.detailActionButton) === null || _a === void 0 ? void 0 : _a.call(props, properties), { key: uuid(), icon: React.createElement(EyeOutlined, null) }), props.detailActionText === undefined
                ? t("View Detail")
                : t(props.detailActionText))),
            props.editActionButton === undefined ? null : (React.createElement(Menu.Item, __assign({}, (_b = props.editActionButton) === null || _b === void 0 ? void 0 : _b.call(props, properties), { key: uuid(), icon: React.createElement(EditOutlined, null) }), t("edit"))),
            props.deleteActionButton === undefined ? null : (React.createElement(Menu.Item, { onClick: function () { return deleteModal(properties); }, key: uuid(), icon: React.createElement(DeleteOutlined, null) }, t("delete")))));
    };
    var actionColumnObj = {
        title: "Action",
        key: "action",
        fixed: "right",
        align: "center",
        width: props.customWidthActionColumn === undefined
            ? 40
            : props.customWidthActionColumn,
        ellipsis: true,
        render: function (props) {
            return (React.createElement(Dropdown, { overlay: menu(props), trigger: ["click"] },
                React.createElement(Button, null,
                    React.createElement(DownOutlined, null))));
        }
    };
    var NOColumnObj = {
        title: "N.O",
        key: "no",
        fixed: "right",
        align: "center",
        width: 20,
        ellipsis: true,
        render: function (_value, _props, index) {
            var calculatePage = function (index) {
                if (pageChange === 1 || pageChange === undefined) {
                    return index + 1;
                }
                else {
                    return (pageChange - 1) * 10 + index + 1;
                }
            };
            return React.createElement("p", null, calculatePage(index));
        }
    };
    var columnsWithAction = __spreadArray(__spreadArray([
        NOColumnObj
    ], props.asurRaaColumnProps), [
        actionColumnObj,
    ]);
    var columnsNoAction = __spreadArray([], props.asurRaaColumnProps);
    var mergeColumns = props.noActionColumn
        ? columnsNoAction
        : columnsWithAction;
    var ChangeViewMode = (React.createElement(Menu, null,
        React.createElement(Menu.Item, { onClick: function () { return setViewMode(AsurRaaComponentViewModeENUM.TABLE); }, key: uuid() },
            React.createElement(TableOutlined, null),
            " Table"),
        props.renderOwnViewColumn === undefined ? null : (React.createElement(Menu.Item, { onClick: function () { return setViewMode(AsurRaaComponentViewModeENUM.COLUMN); }, key: uuid() },
            React.createElement(ColumnWidthOutlined, null),
            " Column")),
        props.renderOwnViewCalender === undefined ? null : (React.createElement(Menu.Item, { onClick: function () { return setViewMode(AsurRaaComponentViewModeENUM.CALENDER); }, key: uuid() },
            React.createElement(CalendarOutlined, null),
            " Calender"))));
    var visibleMenu = (React.createElement(Menu, null, (_a = props.asurRaaColumnProps) === null || _a === void 0 ? void 0 : _a.map(function (column, index) {
        return (React.createElement(Menu.Item, { key: index },
            React.createElement(Checkbox, { onChange: function (value) { return console.log("log value", value); } }, column.title)));
    })));
    var ComponentHeader = function () {
        var _a;
        return (React.createElement(PaddingWrapper, null,
            React.createElement("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row"
                } },
                React.createElement("div", { style: { display: "flex" } },
                    React.createElement("div", null,
                        props.createButton !== undefined ? (React.createElement(Button, __assign({}, props.createButton, { style: { marginRight: 20 } }),
                            React.createElement(PlusCircleOutlined, null),
                            t("add"))) : null,
                        props.refreshButton !== undefined ? (React.createElement(Fragment, null,
                            React.createElement(Button, __assign({}, props.refreshButton, { style: { marginRight: 20 } }),
                                React.createElement(Loading3QuartersOutlined, { spin: props.refreshButton.animate }),
                                t("refresh")))) : null),
                    React.createElement("div", null, (props === null || props === void 0 ? void 0 : props.renderMoreButtonHeader) === undefined
                        ? null
                        : props === null || props === void 0 ? void 0 : props.renderMoreButtonHeader)),
                React.createElement("div", { style: { display: "flex" } },
                    props.renderAnotherChildrenOnRightSide === undefined ? null : (React.createElement("div", { style: { marginRight: 20 } }, props.renderAnotherChildrenOnRightSide)),
                    props.onChangeFilterDataDate !== undefined && (React.createElement(DatePicker.RangePicker, { onChange: function (value) {
                            var _a;
                            var formatStartDate = moment(value === null || value === void 0 ? void 0 : value[0]).format(dateAsurRaaFormatOnlyDateNotWithTime);
                            var formatEndDate = moment(value === null || value === void 0 ? void 0 : value[1]).format(dateAsurRaaFormatOnlyDateNotWithTime);
                            var formatDate = [formatStartDate, formatEndDate];
                            (_a = props === null || props === void 0 ? void 0 : props.onChangeFilterDataDate) === null || _a === void 0 ? void 0 : _a.call(props, formatDate, value);
                        }, allowClear: true, style: { marginRight: 20 } })),
                    props.renderOwnViewColumn === undefined &&
                        props.renderOwnViewCalender === undefined ? null : (
                    // eslint-disable-next-line indent
                    React.createElement(Fragment, null,
                        React.createElement(Dropdown, { overlay: ChangeViewMode, trigger: ["click"] },
                            React.createElement(Button, { style: { marginRight: 20 } },
                                t("view as"),
                                " ",
                                React.createElement(DownOutlined, null))))),
                    props.dataAllCSV !== undefined ||
                        props.dataFilterCSV !== undefined ? (React.createElement("div", null,
                        React.createElement(Popover, { placement: "bottom", content: React.createElement(Fragment, null,
                                props.dataAllCSV !== undefined ? (React.createElement(CSVLink, { data: props === null || props === void 0 ? void 0 : props.dataAllCSV, filename: "all-data.csv" },
                                    React.createElement("a", null, "All Data"))) : null,
                                props.dataFilterCSV !== undefined ? (React.createElement(CSVLink, { data: props === null || props === void 0 ? void 0 : props.dataFilterCSV, filename: "filtered-data.csv" },
                                    React.createElement("br", null),
                                    React.createElement("a", null, "Filtered Data"))) : null), title: React.createElement("div", { style: {
                                    display: "flex",
                                    justifyContent: "space-between"
                                } },
                                React.createElement("div", null, "Export CSV"),
                                React.createElement("div", null,
                                    React.createElement(CloseCircleOutlined, { onClick: function () { return setPopOverCSVState(false); } }))), trigger: "click", visible: popOverCSVState, onVisibleChange: function () { return setPopOverCSVState(true); } },
                            React.createElement(Button, { style: { marginRight: 20 } }, t("export CSV"))))) : null,
                    props.isVisibleColumn !== undefined ? (React.createElement("div", null,
                        React.createElement(Dropdown, { overlay: visibleMenu, trigger: ["click"], visible: visibleDropdownState, onVisibleChange: function (visible) {
                                setVisibleDropdownState(visible);
                            } },
                            React.createElement("a", { className: "ant-dropdown-link", onClick: function (e) { return e.preventDefault(); } },
                                React.createElement(Button, { style: { marginRight: 20 } }, "Visible Column"))))) : null,
                    props.onSearchResult !== undefined ||
                        props.onSearchResult === true ? (React.createElement(Fragment, null,
                        React.createElement(Search, { placeholder: "Search", onChange: function (e) {
                                var _a;
                                var searchValue = e.target.value;
                                if (searchValue.length === 0) {
                                    (_a = props === null || props === void 0 ? void 0 : props.onSearchClear) === null || _a === void 0 ? void 0 : _a.call(props);
                                }
                            }, onSearch: function (search) {
                                var _a;
                                (_a = props === null || props === void 0 ? void 0 : props.onSearchResult) === null || _a === void 0 ? void 0 : _a.call(props, search);
                            }, style: { width: 200 } }),
                        React.createElement(Fragment, null, props.onSearchClear === undefined ? null : (React.createElement(Button, __assign({ style: { width: 10, marginLeft: "-2px" } }, (_a = props === null || props === void 0 ? void 0 : props.onSearchClear) === null || _a === void 0 ? void 0 : _a.call(props)),
                            React.createElement(Flexbox, null,
                                React.createElement(CloseOutlined, null))))))) : null))));
    };
    // * Main Table
    var ViewAsTable = function () {
        var _a, _b;
        return (React.createElement(Fragment, null,
            React.createElement(Table
            // @ts-ignore
            , __assign({ 
                // @ts-ignore
                columns: mergeColumns, dataSource: dataSource, scroll: { x: 1500 } }, props.antdTableProps, { bordered: true, loading: {
                    // @ts-ignore // default={false}
                    spinning: (_b = (_a = props.antdTableProps) === null || _a === void 0 ? void 0 : _a.loading) !== null && _b !== void 0 ? _b : false,
                    indicator: (React.createElement(Flexbox, null,
                        React.createElement(LoadingOutlined, { style: {
                                fontSize: 30
                            }, spin: true })))
                }, onChange: function (pagination) { return setPageChange(pagination.current); } }))));
    };
    var ViewAsColumn = function () {
        var _a;
        return (React.createElement(Fragment, null, props.renderOwnViewColumn === undefined ? (React.createElement("p", null, "Column should be render by yourself")) : ((_a = props === null || props === void 0 ? void 0 : props.renderOwnViewColumn) === null || _a === void 0 ? void 0 : _a.call(props, props.data))));
    };
    var ViewAsCalender = function () {
        var _a;
        return (React.createElement(Fragment, null, props.renderOwnViewCalender === undefined ? (React.createElement("p", null, "Calender should be render by yourself")) : ((_a = props === null || props === void 0 ? void 0 : props.renderOwnViewCalender) === null || _a === void 0 ? void 0 : _a.call(props, props.data))));
    };
    return (React.createElement(Fragment, null,
        props.noNeedHeader ? null : React.createElement(ComponentHeader, null),
        viewMode === AsurRaaComponentViewModeENUM.COLUMN ? (React.createElement(ViewAsColumn, null)) : viewMode === AsurRaaComponentViewModeENUM.CALENDER ? (React.createElement(ViewAsCalender, null)) : (React.createElement(ViewAsTable, null))));
};
export { AsurRaaTable };
var templateObject_1;
//# sourceMappingURL=AsurRaaTable.js.map