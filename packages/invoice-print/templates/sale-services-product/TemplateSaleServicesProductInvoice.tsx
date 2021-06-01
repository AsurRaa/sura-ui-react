import { FC, Fragment, ReactNode } from "react";
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
import { Logger } from "@src/utilities/logger";

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
  invoiceName: string;
  invoiceId: string;
  cashierName: string;
  customerName: string;
  // taxRate: number;
  totalPriceUSD: number;
  totalPriceKHR: number;
  cashRecieveUSD: number;
  cashRecieveKHR: number;
  cashChangeUSD: number;
  cashChangeKHR: number;
  paymentMethod: string;
  renderTable: ReactNode;
}

const GoGymSaleProductServicesTemplateInvoice: FC<
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

  return (
    <Fragment>
      <Document>
        <Page
          size={{ width: 80, height: 60 }}
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
          </View>
          <DashDivider />
          <PaddingRightLeft>
            <View style={{ display: "flex", justifyContent: "space-between" }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {props.invoiceName}{" "}
                {props.paymentMethod === undefined
                  ? null
                  : `(${props.paymentMethod})`}
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
                <p
                  style={{ textAlign: "end", fontWeight: "bold", fontSize: 15 }}
                >
                  {props.customerName}
                </p>
              </View>
            </View>
          </PaddingRightLeft>
          <DashDivider />
          <PaddingRightLeft>{props.renderTable}</PaddingRightLeft>
          <DashDivider />
          <PaddingRightLeft>
            <GenerateLeftRightView
              left={"Grand Total ($)"}
              right={` ${props.totalPriceUSD?.toFixed(2)}`}
            />
            <GenerateLeftRightView
              left={"Grand Total (៛)"}
              right={` ${props.totalPriceKHR?.toFixed(2)}`}
            />
          </PaddingRightLeft>
          <DashDivider />
          <PaddingRightLeft>
            <GenerateLeftRightView
              left={"Cash (USD)"}
              right={` ${props.cashRecieveUSD?.toFixed(2)}`}
            />
            <GenerateLeftRightView
              left={"Cash (KHR)"}
              right={` ${props.cashRecieveKHR?.toFixed(2)}`}
            />
            <GenerateLeftRightView
              left={"Change (USD)"}
              right={` ${props.cashChangeUSD?.toFixed(2)}`}
            />
            <GenerateLeftRightView
              left={"Change (KHR)"}
              right={` ${props.cashChangeKHR?.toFixed(2)}`}
            />
          </PaddingRightLeft>
          <DashDivider />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h2>Thank you</h2>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <p style={{ textAlign: "center" }}>Tel: {configData.phone}</p>
            <p style={{ textAlign: "center" }}>
              {configData?.address}
              <br /> {configData.website} | FB: {configData.facebook}
              <br />
              Powered by @asurraa
            </p>
          </div>
        </Page>
      </Document>
    </Fragment>
  );
};

export { GoGymSaleProductServicesTemplateInvoice };
