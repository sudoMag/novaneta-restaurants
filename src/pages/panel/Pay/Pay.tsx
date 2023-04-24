import { useContext, useEffect, useRef, useState } from "react";
import { LeftContent, RightContent } from "../../../components/SplittedPanel";
import { CashContext } from "../../../context/CashContext";
import Logo from "../../../icons/logowhite.svg";
import ProductInCart from "../../../utils/types/ProductInCart";
import { KitchenContext } from "../../../context/KitchenContext";
import CartToClient from "../../../utils/types/CartToClient";
import { PayContext } from "../../../context/PayContext";
import { NumericFormat, PatternFormat } from "react-number-format";
import {
  DisableButton,
  InputBar,
  PayButton,
  PayType,
  PayTypeContainer,
  SendButton,
  SendToKitchenButton,
} from "./PayPageStyles";
import useCLientData from "./hooks/useClientData";
import Invoice from "./Invoice/Invoice";
import PrintButton from "./Invoice/components/PrintButton/PrintButton";

const Pay = () => {
  const [productsList, setProductsList] = useState<ProductInCart[]>([]);

  const { cartToClient, selectedCart } = useContext(CashContext);
  const invoiceRef = useRef<HTMLDivElement | null>(null);
  const { totalToPay, debtsInView, successfulPayment } = useContext(PayContext);
  const { ordersInView, sendToTheKitchen } = useContext(KitchenContext);
  const {
    client,
    showCLientCreationForm,
    payType,
    selectPaytype,
    selectedClient,
    changeEventHandle,
    handleSubmmit,
  } = useCLientData();

  const HandleClick = (cart: CartToClient) => {
    if (selectedCart !== -1) {
      sendToTheKitchen(cart);
    }
  };

  const setInvoiceValue = (value: HTMLDivElement | null) => {
     invoiceRef.current = value
  }

  // 🚧🚧🚧🚧

  useEffect(() => {
    let invoiceList: ProductInCart[] = [];

    debtsInView.forEach(() => {});
    setProductsList(invoiceList);
  }, [debtsInView]);

  // 🚧🚧🚧🚧

  return (
    <>
      <LeftContent>
        <img src={Logo} alt="logo novaneta" />
        <h3>datos</h3>
        {/* ClientFinder side */}
        <h1>
          Total a Pagar:{" "}
          <span>
            $
            {
              <NumericFormat
                allowLeadingZeros
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                value={totalToPay}
              />
            }
          </span>
        </h1>
        {selectedClient ? <h2>debito credito efectivo</h2> : null}
        {selectedCart === -1 ||
        cartToClient[selectedCart].products.length === 0 ? (
          <DisableButton>Enviar a Cocina</DisableButton>
        ) : (
          <SendToKitchenButton
            onClick={() => HandleClick(cartToClient[selectedCart])}
          >
            Enviar a cocina
          </SendToKitchenButton>
        )}
        {debtsInView.length === 0 ? (
          <DisableButton>Pagar</DisableButton>
        ) : (
          <>
            <PayTypeContainer>
              <PayType
                active={payType === "cash" ? true : false}
                onClick={() => selectPaytype("cash")}
              >
                Efectivo
              </PayType>
              <PayType
                active={payType === "debt" ? true : false}
                onClick={() => selectPaytype("debt")}
              >
                Debito
              </PayType>
              <PayType
                active={payType === "credit" ? true : false}
                onClick={() => selectPaytype("credit")}
              >
                Credito
              </PayType>
            </PayTypeContainer>
            <PayButton onClick={() => successfulPayment(payType)}>
              Pagar
            </PayButton>
          </>
        )}
      </LeftContent>
      <RightContent>
        {!showCLientCreationForm ? (
          <>
            <h3>Factura</h3>
            <Invoice
              setRef={setInvoiceValue}
              orders={ordersInView}
              products={productsList}
              total={totalToPay}
            />
            {productsList.length !== 0 && (
              <PrintButton invoiceRef={invoiceRef} />
            )}
          </>
        ) : (
          <>
            <h1>Registrar Cliente</h1>
            <InputBar
              name="firstName"
              placeholder="Nombre"
              onChange={changeEventHandle}
              value={client.firstName}
            />
            <InputBar
              name="lastName"
              placeholder="Apellido"
              onChange={changeEventHandle}
              value={client.lastName}
            />
            <PatternFormat
              format="## # #### ####"
              mask=""
              placeholder={"+00 00 00 0000"}
              valueIsNumericString={true}
              allowLeadingZeros={false}
              allowNegative={false}
              allowEmptyFormatting={false}
              allowDecimal={false}
              customInput={InputBar}
              name="phoneNumber"
              onChange={changeEventHandle}
              value={client.phoneNumber}
            />
            <InputBar
              name="address"
              placeholder="dirección"
              onChange={changeEventHandle}
              value={client.address}
            />
            {client.firstName !== "" &&
            client.lastName !== "" &&
            client.phoneNumber !== "" &&
            client.address !== "" &&
            client.rut !== "" ? (
              <SendButton onClick={() => handleSubmmit(client)}>
                Crear
              </SendButton>
            ) : null}
          </>
        )}
      </RightContent>
    </>
  );
};

export default Pay;
