import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LeftContent, RightContent } from "../../components/SplittedPanel";
import { CashContext } from "../../context/CashContext";
import useCurrencyFormat from "../../hooks/useCurrencyFormat";
import Logo from "../../icons/logowhite.svg";
import LogoBlack from "../../icons/logoblack.svg";
import ReactToPrint from "react-to-print";
import { UserContext } from "../../context/UserContext";

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
  display: flex;
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
  background-color: #a45b17;
  color: #1d1e20;
  font-weight: bold;
  cursor: pointer;
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

const Pay = () => {
  const [totalToPay, setTotalToPay] = useState(0);
  const { cart } = useContext(CashContext);
  const { formatCurrency } = useCurrencyFormat();
  const invoiceRef = useRef<HTMLDivElement | null>(null);
  const { userData } = useContext(UserContext);

  const getDate = () => {
    const now = Date.now();
    return `${new Date(now).toLocaleDateString()} ${new Date(now).getHours()}:${new Date(now).getMinutes()}`;
  }

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setTotalToPay(total);
  }, [cart]);

  return (
    <>
      <LeftContent>
        <img src={Logo} alt="logo novaneta" />
        <h3>datos</h3>
        <h1>
          Total a Pagar: <span>$ {formatCurrency("CLP", totalToPay)}</span>
        </h1>
        {cart.length !== 0 ? (
          <ReactToPrint
            trigger={() => <PrintButton>IMPRIMIR</PrintButton>}
            content={() => invoiceRef.current}
          />
        ) : null}
      </LeftContent>
      <RightContent>
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
            {cart.map((item) => {
              return (
                <Item key={item.product.id}>
                  x{item.quantity} {item.product.name}
                  <ItemPrice>{item.product.price}</ItemPrice>
                </Item>
              );
            })}
          </ItemsContainer>
          <hr />
          <TotalsContainer>
            <InvoiceTotal>TOTAL: {totalToPay}</InvoiceTotal>
          </TotalsContainer>
        </Invoice>
      </RightContent>
    </>
  );
};

export default Pay;
