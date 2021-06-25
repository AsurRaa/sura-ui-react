/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { fixNumberFunc } from "../../utilities/src/number-separator";
import { useDebounceFn } from "ahooks";
import { Button, Divider, Radio, Typography } from "antd";
import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AsurRaaInputMoney } from "@asurraa/sura-ui-input-money";
import { InputHeader } from "@asurraa/sura-ui-common-styles";
import {
  AsurRaaModal,
  AsurRaaModalProps,
} from "@asurraa/sura-ui-modal/src/index";
import { AsurRaaRichTextEditor } from "@asurraa/sura-ui-rich-text-editor";
import { useGetAsurRaaPaymentModal } from "./AsurRaaPaymentModalProvider";

export type callBackPayEssentialValueType = {
  grandTotalUSD: number;
  grandTotalKHR: number;
  cashBackUSD: number;
  cashBackKHR: number;
  cashReceivedTotalAsUSD: number;
  cashReceivedTotalAsKHR: number;
  cashReceivedUSD: number;
  cashToPayInKHR: number;
  cashToPayInUSD: number | undefined;
  paymentMethod: "CASH" | "BANK";
  note: string | undefined;
};
export interface AsurRaaPaymentModalProps extends AsurRaaModalProps {
  onPay?: (
    value: callBackPayEssentialValueType,
    e: React.MouseEvent<HTMLElement>
  ) => void;
  onPayEvent?: (
    e: React.MouseEvent<HTMLElement>,
    value?: callBackPayEssentialValueType
  ) => void;
  cashToPayDataProps: number | undefined;
  modalProps?: AsurRaaModalProps;
  callBackPayEssentialValue?: (value: callBackPayEssentialValueType) => void;
  isPayLoading: boolean | undefined;
}

export const AsurRaaPaymentModal: FC<AsurRaaPaymentModalProps> = (props) => {
  const [openEditor, setOpenEditor] = useState<boolean>(false);
  const { t } = useTranslation();
  const [cashToPayInUSD, setCashToPayInUSD] = useState<number>();
  const providerConfig = useGetAsurRaaPaymentModal();
  const kCurrencyRielExchange = Number(providerConfig?.khrExchangeRate);
  const [paymentMethod, setPaymentsMethod] = useState<"CASH" | "BANK">("CASH");
  const cashToPayInKHR = useMemo<number>(() => {
    return kCurrencyRielExchange * cashToPayInUSD!;
  }, [cashToPayInUSD, kCurrencyRielExchange]);
  const [noteState, setNoteState] = useState<string | undefined>();
  const [cashReceivedUSD, setCashReceivedUSD] = useState<number>(0);
  const [cashReceivedKHR, setCashReceivedKHR] = useState<number>(0);
  const cashReceivedTotalAsUSD = useMemo(() => {
    return cashReceivedUSD + cashReceivedKHR / kCurrencyRielExchange;
  }, [cashReceivedKHR, cashReceivedUSD, kCurrencyRielExchange]);

  const isAllowToPay =
    cashReceivedTotalAsUSD < props.cashToPayDataProps! ? true : false;

  const grandTotalUSD = props.cashToPayDataProps!;
  const grandTotalKHR = props.cashToPayDataProps! * kCurrencyRielExchange;

  const cashBackUSD = useMemo(() => {
    const sum = cashReceivedTotalAsUSD - props.cashToPayDataProps!;
    if (sum < 0) {
      return 0;
    } else {
      return sum;
    }
  }, [cashReceivedTotalAsUSD, props.cashToPayDataProps]);
  const cashBackKHR = useMemo(() => {
    const sum = cashBackUSD * kCurrencyRielExchange;
    if (sum < 0) {
      return 0;
    } else {
      return sum;
    }
  }, [cashBackUSD, kCurrencyRielExchange]);

  useEffect(() => {
    setCashToPayInUSD(
      (props?.cashToPayDataProps ?? 0) - cashReceivedTotalAsUSD < 0
        ? 0
        : (props?.cashToPayDataProps ?? 0) - cashReceivedTotalAsUSD
    );
  }, [props.cashToPayDataProps, cashReceivedTotalAsUSD]);

  const { run } = useDebounceFn((e) => {
    props?.callBackPayEssentialValue?.({
      grandTotalUSD,
      grandTotalKHR,
      cashBackKHR,
      cashBackUSD,
      cashReceivedTotalAsUSD,
      cashReceivedUSD,
      cashToPayInKHR,
      cashToPayInUSD,
      paymentMethod,
      cashReceivedTotalAsKHR: cashReceivedKHR,
      note: noteState,
    });
    props?.onPayEvent?.(e, {
      grandTotalUSD,
      grandTotalKHR,
      cashBackKHR,
      cashBackUSD,
      cashReceivedTotalAsUSD,
      cashReceivedUSD,
      cashToPayInKHR,
      cashToPayInUSD,
      paymentMethod,
      cashReceivedTotalAsKHR: cashReceivedKHR,
      note: noteState,
    });
    props?.onPay?.(
      {
        grandTotalUSD,
        grandTotalKHR,
        cashBackKHR,
        cashBackUSD,
        cashReceivedTotalAsUSD,
        cashReceivedUSD,
        cashToPayInKHR,
        cashToPayInUSD,
        paymentMethod,
        cashReceivedTotalAsKHR: cashReceivedKHR,
        note: noteState,
      },
      e
    );
  });

  const ModalEditor = (
    <div>
      <AsurRaaModal
        visible={openEditor}
        title={"Payments Note"}
        initialHeight={330}
        onCancel={() => {
          setNoteState(undefined);
          setOpenEditor(false);
        }}
        okText={t("Save")}
        onOk={() => setOpenEditor(false)}
      >
        <div style={{ height: 150 }}>
          <AsurRaaRichTextEditor
            onChange={(value) => {
              setNoteState(value);
            }}
          />
        </div>
      </AsurRaaModal>
    </div>
  );

  return (
    <Fragment>
      {ModalEditor}
      <AsurRaaModal
        afterClose={() => {
          setCashReceivedUSD(0), setCashReceivedKHR(0);
        }}
        title={t("Sale Membership Payments")}
        destroyOnClose={true}
        okText={"Pays"}
        initialHeight={800}
        footer={
          <Fragment>
            <Button
              disabled={isAllowToPay}
              style={{ width: "100%", height: "50px" }}
              type="primary"
              onClick={run}
            >
              <Typography.Text strong style={{ color: "white" }}>
                {props.isPayLoading ? (
                  <LoadingOutlined style={{ marginRight: 10 }} />
                ) : null}
                {t("Payment")}
              </Typography.Text>
            </Button>
          </Fragment>
        }
        {...props}
      >
        <InputHeader>{t("Cash To Pay in USD")}</InputHeader>
        <AsurRaaInputMoney
          disabled={true}
          currency="USD"
          size="large"
          readOnly
          value={fixNumberFunc(cashToPayInUSD ?? 0, 2)}
        />
        <InputHeader>{t("Cash To Pay in KHR")}</InputHeader>
        <AsurRaaInputMoney
          disabled={true}
          currency="KHR"
          readOnly
          size="large"
          value={fixNumberFunc(cashToPayInKHR, 0)}
        />
        <Divider />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <InputHeader>Payments Method</InputHeader>
          <InputHeader>
            <a onClick={() => setOpenEditor(true)}>Note</a>
          </InputHeader>
        </div>
        <Radio.Group
          defaultValue={"CASH"}
          onChange={(e) => setPaymentsMethod(e.target.value)}
        >
          <Radio value={"CASH"}>Cash</Radio>
          <Radio value={"BANK"}>Bank</Radio>
        </Radio.Group>

        <InputHeader>{t("Cash Recieve in USD")}</InputHeader>
        <AsurRaaInputMoney
          currency="USD"
          size="large"
          style={{ width: "100%" }}
          min={0}
          // value={cashReceivedUSD}
          autoFocus
          onChange={(value: any) => {
            setCashReceivedUSD(Number(value));
          }}
        />
        <InputHeader>{t("Cash Recieve in KHR")}</InputHeader>
        <AsurRaaInputMoney
          currency="KHR"
          size="large"
          min={0}
          style={{ width: "100%" }}
          defaultValue={0}
          value={cashReceivedKHR}
          onChange={(value: any) => {
            setCashReceivedKHR(Number(value));
          }}
        />

        <Divider />
        <InputHeader>{t("Cash Back in USD")}</InputHeader>
        <AsurRaaInputMoney
          size="large"
          currency="USD"
          readOnly
          disabled
          style={{ width: "100%" }}
          value={fixNumberFunc(cashBackUSD, 2)}
        />
        <InputHeader>{t("Or Cash Back in KHR")}</InputHeader>
        <AsurRaaInputMoney
          size="large"
          currency="KHR"
          readOnly
          disabled
          style={{ width: "100%" }}
          value={fixNumberFunc(cashBackKHR, 0)}
        />
      </AsurRaaModal>
    </Fragment>
  );
};
