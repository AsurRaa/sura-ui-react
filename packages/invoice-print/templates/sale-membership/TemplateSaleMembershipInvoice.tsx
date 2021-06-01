import { FC, Fragment, ReactNode, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import gogymLogo from "@src/assets/svg/gogym-green-logo.svg";
import styled from "styled-components";
import moment from "moment";

import { useGetOnlineConfig } from "@src/hooks/useGetOnlineConfig";

const DashDivider = styled.hr`
  border: 1px;
  border-style: dashed;
  color: black;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const PaddingRightLeft = styled.div`
  padding-right: 10px;
  padding-left: 10px;
`;

interface GoGymTemplateInvoiceInterface {
  invoiceType: string;
  invoiceId: string;
  cashierName: string;
  customerName: string;
  totalPrice: number;
  taxRate: number;
  cashRecieve: number;
  cashChangeUSD: number;
  cashChangeKHR: number;
  renderTable: ReactNode;
}

const GoGymSaleMembershipTemplateInvoice: FC<
  Partial<GoGymTemplateInvoiceInterface>
> = (props) => {
  const configData = useGetOnlineConfig();

  // Date
  const currentDate = moment().format("DD-MM-yy");
  const currentTime = moment().format("hh:mm A");
  const styles = StyleSheet.create({
    pageWrapper: {
      paddingTop: 30,
      paddingBottom: 30,
      paddingLeft: 15,
      paddingRight: 15,
    },
    center: {
      display: "flex",
      justifyContent: "center",
    },
    spacer: {
      paddingTop: 20,
      paddingBottom: 20,
    },
    infoStyle: {
      width: 250,
      textAlign: "center",
      fontFamily: "Ubuntu",
      fontWeight: "bold",
    },
  });
  Font.register({
    family: "Siemreap",
    src: "../fonts/siemreap/Siemreap-Regular.ttf",
  });
  Font.register({
    family: "Ubuntu",
    src: "../fonts/ubuntu/UbuntuMono-Regular.ttf",
  });
  Font.register({
    family: "Ubuntu bold",
    src: "../fonts/ubuntu/UbuntuMono-Bold.ttf",
  });

  const InfoAsJSX = () => (
    <div>
      <p>{configData?.address}</p>
      Tel: {configData?.phone}
    </div>
  );
  const GenerateLeftRightView = ({
    left,
    right,
  }: {
    left: string | undefined;
    right: string | undefined;
  }) => {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>{left}</Text>
        </View>
        <View style={{ fontWeight: "bold", fontSize: 15 }}>
          <Text>{right}</Text>
        </View>
      </View>
    );
  };

  const GrandTotalView = ({ value }: { value: string }) => {
    return (
      <View style={{ display: "flex", justifyContent: "flex-end", flex: 1 }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View
            style={{ display: "flex", alignItems: "center", marginRight: 25 }}
          >
            <Text style={{ fontSize: "23px", fontWeight: "bold" }}>
              Grand Total
            </Text>
          </View>
          <View>
            <DashDivider />
            <Text style={{ fontSize: "23px", fontWeight: "bold" }}>
              {value}
            </Text>
            <DashDivider />
          </View>
        </View>
      </View>
    );
  };
  return (
    <Fragment>
      <Document>
        <Page
          style={{
            flexDirection: "column",
          }}
        >
          <View
            style={{
              ...styles.pageWrapper,
            }}
          >
            <View style={styles.center}>
              <img
                src={gogymLogo}
                style={{
                  height: 120,
                  width: 120,
                }}
              />
            </View>
            <View style={{ ...styles.center, ...styles.spacer }}>
              <Text style={styles.infoStyle}>
                <InfoAsJSX />
              </Text>
            </View>
          </View>
          <DashDivider />
          <PaddingRightLeft>
            <View style={{ display: "flex", justifyContent: "space-between" }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {props.invoiceType}
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {props.invoiceId}
              </Text>
            </View>
            <br />
            <Text style={{ fontWeight: "bold", fontSize: 15, marginRight: 50 }}>
              Bill date: {currentDate}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {currentTime}
            </Text>
          </PaddingRightLeft>
          <DashDivider />
          <PaddingRightLeft>
            <View style={{ display: "flex", justifyContent: "space-between" }}>
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Cashier
                </Text>
                <br />
                <Text
                  style={{ fontWeight: "bold", fontSize: 15, marginRight: 50 }}
                >
                  {props.cashierName}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "right",
                  }}
                >
                  Customer
                </Text>
                <br />
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {props.customerName}
                </Text>
              </View>
            </View>
          </PaddingRightLeft>
          <DashDivider />
          <PaddingRightLeft>{props.renderTable}</PaddingRightLeft>
          <DashDivider />
          <PaddingRightLeft>
            {/* <GenerateLeftRightView
              left={"Sub Total(Incl. Tax)"}
              right={"KHR 1600.00"}
            />
            <GenerateLeftRightView
              left={"Incl. Govt. Tax (10%)"}
              right={"KHR 1454.54"}
            />
            <GrandTotalView value={"KHR 16000.00"} /> */}
            <GenerateLeftRightView
              left={"Grand Total ($)"}
              right={`$${props.totalPrice?.toString()}`}
            />
          </PaddingRightLeft>
          <DashDivider />
          <PaddingRightLeft>
            <GenerateLeftRightView
              left={"Cash"}
              right={`$${props.cashRecieve?.toString()}`}
            />
            <GenerateLeftRightView
              left={"Change in USD"}
              right={`$${props.cashChangeUSD?.toString()}`}
            />
            <GenerateLeftRightView
              left={"Change in KHR"}
              right={`៛${props.cashChangeKHR?.toString()}`}
            />
          </PaddingRightLeft>
          <DashDivider />
        </Page>
      </Document>
    </Fragment>
  );
};

export { GoGymSaleMembershipTemplateInvoice as GoGymSaleMembershipTemplateInvoice };
