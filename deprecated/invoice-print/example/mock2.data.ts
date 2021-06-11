import { DataToPrint } from "../AsurRaaInvoicePrintWithPdfMake";

export const mockDataV2: DataToPrint = {
  configs: {
    title: "CUBETIQ Coperation Co,Ltd",
    headline: "Export Items",
    logoUrl:
      "data:image/png;base64,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",
    columnsHeader: [
      {
        text: "productName",
        alignment: "left",
        fontSize: 9,
      },
      {
        text: "qty",
        alignment: "center",
        fontSize: 9,
      },
      {
        text: "Tag",
        alignment: "center",
        fontSize: 9,
      },
    ],
  },
  data: {
    header: {
      invoiceNumber: "INV00001",
      date: "13-10-2020",
      time: "10:30 AM",
      staff: "Sambo",
      type: "Adjustment",
      note: "Adjustment items from stock, and these are broken",
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
        text: "Powered by CUBETIQ Solution, Tel : 087 686800",
        fontSize: 7,
        alignment: "center",
        bold: true,
        margin: [0, 2],
      },
      {
        text: "WIFI-Password: Cubetiqs",
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
