import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LeftContent, RightContent } from "../../components/SplittedPanel";
import { CashContext } from "../../context/CashContext";
import Logo from "../../icons/logowhite.svg";
import LogoBlack from "../../icons/logoblack.svg";
import ReactToPrint from "react-to-print";
import { UserContext } from "../../context/UserContext";
import ProductInCart from "../../interfaces/ProductInCart";
import { KitchenContext } from "../../context/KitchenContext";
import CartToClient from "../../interfaces/CartToClient";
import newClientIcon from "../../icons/newcart.svg";
import { PayContext } from "../../context/PayContext";
import { DocumentData } from "firebase/firestore";
import Scale from "../../components/animations/Scale";
import { NumericFormat, PatternFormat } from "react-number-format";
import formatStringByPattern from "format-string-by-pattern";

const Invoice = styled.div`
  width: 8cm;
  min-height: 8cm;
  background-color: white;
  justify-content: center;
  color: black;
  font-family: monospace;
  padding-bottom: 30px;

  & hr {
    width: 90%;
    border: 1px solid black;
    border-style: dashed;
  }
`;

const InvoiceHeader = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & img {
    width: 60%;
  }
`;

const InvoiceTitle = styled.h4`
  color: black;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const ItemsContainer = styled.div``;

const Item = styled.div`
  color: black;
  display: grid;
  grid-template-columns: 2fr 0.5fr 0.5fr;
  gap: 10px;
  padding: 0 15px;
  justify-content: space-between;
  margin: 3px;
`;

const ItemPrice = styled.div``;

const TotalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 20px;
`;

const InvoiceTotal = styled.h4`
  margin: 2px 0;
`;

const PrintButton = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: var(--bg-main-color);
  color: #1d1e20;
  font-weight: bold;
  cursor: pointer;
  margin: 10px;
`;

const DataUser = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;

  & h4 {
    margin: 2px 20px;
  }
`;

const SendToKitchenButton = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: var(--bg-main-color);
  color: #1d1e20;
  font-weight: bold;
  cursor: pointer;
  margin: 10px;
`;

const DisableButton = styled.div`
  padding: 10px;
  background-color: #414141;
  border-radius: 10px;
  margin: 10px;
  font-weight: bold;
  color: #1d1e20;
`;

const InputBar = styled.input`
  margin: 5px;
  border-radius: 10px;
  max-width: 300px;
  height: 30px;
  background-color: #9fa2a7;
  text-align: center;
  border: none;
  color: var(--bg-color);
  font-weight: bold;
  font-family: system-ui;
  border: 2px solid transparent;

  &::placeholder {
    color: var(--bg-color);
    font-weight: bold;
  }

  &:focus-visible {
    border: 2px solid #747474;
    outline: none;
  }
`;

const NewClientButton = styled.img`
  border-radius: 8px;
  padding: 10px 10px;
  background-color: var(--bg-color);
  border: 1px solid #383838;
  margin: 10px 20px;
  cursor: pointer;
`;

const InputsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SendButton = styled.div`
  padding: 10px 0;
  border-radius: 10px;
  background-color: var(--bg-main-color);
  color: #1d1e20;
  font-weight: bold;
  cursor: pointer;
  margin: 10px;
  width: 180px;
  justify-content: center;
  display: flex; ;
`;

const ClientList = styled.ul`
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 0;
  justify-items: center;
  width: 70%;

  & li {
    cursor: pointer;
    display: block;
    background-color: #8080803d;
    padding: 5px 20px;
    border-radius: 10px;
    animation: ${Scale} 200ms ease-in-out;
  }

  & li span {
    color: var(--bg-main-color);
    font-weight: bold;
  }
`;

const SearchClientsBox = styled.div`
  padding: 5px 10px;
  background-color: #76767642;
  border-radius: 10px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Pay = () => {
  const [productsList, setProductsList] = useState<ProductInCart[]>([]);
  const [client, setClient] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    rut: "",
  });
  const [selectedClient, setSelectedClient] = useState<DocumentData>();
  const [newClientMode, setNewClientMode] = useState(false);
  const [organizedClientList, setOrganizedClientList] = useState<
    DocumentData[]
  >([]);

  const { cartToClient, selectedCart } = useContext(CashContext);
  const invoiceRef = useRef<HTMLDivElement | null>(null);
  const { userData } = useContext(UserContext);
  const { totalToPay, debtsInView, clients, registNewClient, findClient } =
    useContext(PayContext);
  const { ordersInView, sendToTheKitchen } = useContext(KitchenContext);

  const getDate = () => {
    const now = Date.now();
    return `${new Date(now).toLocaleDateString()} ${new Date(
      now
    ).getHours()}:${new Date(now).getMinutes()}`;
  };

  const HandleClick = (cart: CartToClient) => {
    if (selectedCart !== -1) {
      sendToTheKitchen(cart);
    }
  };

  const changeEventHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setClient({
      ...client,
      [e.currentTarget.name]: e.target.value,
    });
    if (
      e.currentTarget.name === "rut" ||
      e.currentTarget.name === "phoneNumber"
    ) {
      setClient({
        ...client,
        [e.currentTarget.name]: e.target.value.replace(/[^\d]/g, ""),
      });
      findClient.get(e.target.value.replace(/[^\d]/g, ""));
    }
  };

  const handleSubmmit = (client: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    rut: string;
  }) => {
    registNewClient(client);
    setClient({
      ...client,
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
    });
  };

  const selectClient = (client: DocumentData) => {
    setSelectedClient(client);
    setClient({
      rut: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
    });
  };

  useEffect(() => {
    let invoiceList: ProductInCart[] = [];
    const debtsList = debtsInView;

    setProductsList(invoiceList);
  }, [debtsInView]);

  useEffect(() => {
    if (client.rut !== "") {
      const filtered = clients.filter((item) =>
        item.rut
          .slice(0, client.rut.length)
          .includes(client.rut.slice(0, client.rut.length))
      );
      setOrganizedClientList(filtered);
    } else {
      setOrganizedClientList([]);
    }
  }, [client.rut, clients]);

  return (
    <>
      <LeftContent>
        <img src={Logo} alt="logo novaneta" />
        <h3>datos</h3>
        {false ? (
          <SearchClientsBox>
            <InputsContainer>
              <PatternFormat
                format="##.###.###-#"
                mask=""
                placeholder={"00.000.000-0"}
                valueIsNumericString={true}
                allowLeadingZeros={false}
                allowNegative={false}
                allowEmptyFormatting={false}
                allowDecimal={false}
                customInput={InputBar}
                name="rut"
                value={client.rut}
                onChange={changeEventHandle}
              />
              <NewClientButton
                src={newClientIcon}
                onClick={() => setNewClientMode(!newClientMode)}
              />
            </InputsContainer>
            <ClientList>
              {organizedClientList.map((item) => (
                <>
                  <li onClick={() => selectClient(item)}>
                    <PatternFormat
                      format="##.###.###-#"
                      mask=""
                      valueIsNumericString={true}
                      allowEmptyFormatting={false}
                      displayType="text"
                      renderText={(value) => (
                        <>
                          <span>
                            {value.slice(
                              0,
                              formatStringByPattern("99.999.999-1", client.rut)
                                .length
                            )}
                          </span>
                          {value.slice(
                            formatStringByPattern("99.999.999-1", client.rut)
                              .length,
                            value.length
                          )}
                        </>
                      )}
                      value={item.rut}
                    />
                  </li>
                  <li onClick={() => selectClient(item)}>
                    {item.firstName} {item.lastName}
                  </li>
                </>
              ))}
            </ClientList>
          </SearchClientsBox>
        ) : null}
        {selectedClient ? (
          <>
            <h2>
              pagará {selectedClient.firstName} {selectedClient.lastName}
            </h2>
            <span>
              {formatStringByPattern("99.999.999-1", selectedClient.rut)}
            </span>
          </>
        ) : null}
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
        {selectedCart === -1 ? (
          <DisableButton>Enviar a Cocina</DisableButton>
        ) : (
          <SendToKitchenButton
            onClick={() => HandleClick(cartToClient[selectedCart])}
          >
            Enviar a cocina
          </SendToKitchenButton>
        )}
      </LeftContent>
      <RightContent>
        {!newClientMode ? (
          <>
            <h3>Factura</h3>
            <Invoice ref={(el) => (invoiceRef.current = el)}>
              <InvoiceHeader>
                <img src={LogoBlack} alt="logo novaneta" />
                <DataUser>
                  <h4>Fecha: {getDate()}</h4>
                  <h4>Local: {userData?.name}</h4>
                  <h4>Rut: {userData?.rut}</h4>
                  <h4>Dir: {userData?.direction}</h4>
                </DataUser>
              </InvoiceHeader>
              <hr />
              <InvoiceTitle>FACTURA</InvoiceTitle>
              <ItemsContainer>
                {ordersInView !== undefined
                  ? ordersInView.map((order) =>
                      order.products.map((item) => {
                        return (
                          <Item key={item.product.id}>
                            x{item.quantity} {item.product.name}
                            <ItemPrice>{item.product.price}</ItemPrice>
                          </Item>
                        );
                      })
                    )
                  : null}
                {productsList.map((item) => {
                  return (
                    <Item key={item.product.id}>
                      x{item.quantity} {item.product.name}
                      <NumericFormat
                        allowLeadingZeros
                        thousandSeparator="."
                        decimalSeparator=","
                        displayType="text"
                        value={item.product.price}
                        renderText={(value) => <ItemPrice>{value}</ItemPrice>}
                      />
                      <NumericFormat
                        allowLeadingZeros
                        thousandSeparator="."
                        decimalSeparator=","
                        displayType="text"
                        value={item.product.price * item.quantity}
                        renderText={(value) => <ItemPrice>{value}</ItemPrice>}
                      />
                    </Item>
                  );
                })}
              </ItemsContainer>
              <hr />
              <TotalsContainer>
                <NumericFormat
                  allowLeadingZeros
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  value={totalToPay}
                  renderText={(value) => (
                    <InvoiceTotal>TOTAL: ${value}</InvoiceTotal>
                  )}
                />
              </TotalsContainer>
            </Invoice>
            {productsList.length !== 0 ? (
              <ReactToPrint
                trigger={() => <PrintButton>IMPRIMIR</PrintButton>}
                content={() => invoiceRef.current}
              />
            ) : null}
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
