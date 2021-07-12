import { Loading3QuartersOutlined, PlusOutlined } from "@ant-design/icons";
import { Select, SelectProps, Tooltip } from "antd";
import React, { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const RefreshListIcon = styled(Loading3QuartersOutlined)`
	margin-left: 10px;
	padding: 8px;
	background: #fff;
	border: 1px solid #d9d9d9;
	border-top-left-radius: 2px !important;
	border-top-right-radius: 2px;
	border-bottom-right-radius: 2px;
	border-bottom-left-radius: 2px;
`;

const AddListIcon = styled(PlusOutlined)`
	margin-left: 10px;
	padding: 8px;
	background: #fff;
	border: 1px solid #d9d9d9;
	border-top-left-radius: 2px !important;
	border-top-right-radius: 2px;
	border-bottom-right-radius: 2px;
	border-bottom-left-radius: 2px;
`;

export interface AsurRaaSelectProps extends SelectProps<any> {
	isLoading?: boolean;
	refreshButtonProps?: React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>;
	addButtonProps?: React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>;
}

export const AsurRaaSelect: FC<AsurRaaSelectProps> = (props) => {
	const { t } = useTranslation();
	return (
		<Fragment>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Select
					showSearch={true}
					allowClear={true}
					{...props}
					style={{ width: "100%" }}
					showArrow={true}
					filterOption={(input, option) =>
						option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
				/>
				{props.refreshButtonProps === undefined ? null : (
					<div {...props.refreshButtonProps}>
						<Tooltip title={t("Click to refresh")}>
							<RefreshListIcon style={{ cursor: "pointer" }} />
						</Tooltip>
					</div>
				)}
				{props.addButtonProps === undefined ? null : (
					<div {...props.addButtonProps}>
						<AddListIcon style={{ cursor: "pointer" }} />
					</div>
				)}
			</div>
		</Fragment>
	);
};
