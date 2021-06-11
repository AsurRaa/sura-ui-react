import { DataToPrint } from "../AsurRaaInvoicePrintWithPdfMake";
import image from "./base64_image";
export const mockDataV1: DataToPrint = {
  configs: {
    title: "AsuRaa",
    headline: "Sale Membership",
    logoUrl: image,
    columnsHeader: [
      {
        text: "Product Name",
        alignment: "left",
        fontSize: 9,
      },
      {
        text: "qty",
        alignment: "center",
        fontSize: 9,
      },
      {
        text: "Price",
        alignment: "center",
        fontSize: 9,
      },
    ],
  },
  data: {
    header: {
      InvoiceNumber: "INV00001",
      Date: "13-10-2020",
      Time: "10:30 AM",
      Staff: "Sambo",
      Type: "Adjustment",
      Note: "Adjustment items from stock, and these are broken",
    },
    items: [
      {
        productName: "iMac Pro 2020",
        qty: 1,
        tags: "Broken",
      },
      {
        productName: "MacBook Pro 2020",
        qty: 1,
        tags: "",
      },
    ],
    summary: {
      totalQty: 2,
      totalAmount: 260,
      receiveUSD: 300,
      refundUSD: 20,
      refundReil: 80000,
    },
    footer: [
      {
        text: "Powered by AsurRaa, Tel : 0965416898",
        fontSize: 7,
        alignment: "center",
        bold: true,
        margin: [0, 2],
      },
      {
        text: "WIFI-Password: asurraaLucke",
        fontSize: 10,
        bold: true,
        alignment: "center",
        margin: [0, 5],
      },
      {
        text: "Thank for coming !!",
        fontSize: 7,
        alignment: "center",
        bold: true,
        margin: [0, 2],
      },
    ],
  },
};
