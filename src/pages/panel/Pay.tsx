import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LeftContent, RightContent } from "../../components/SplittedPanel";
import { CashContext } from "../../context/CashContext";
import useCurrencyFormat from "../../hooks/useCurrencyFormat";
import Logo from "../../icons/logowhite.svg";
import ReactToPrint from "react-to-print";


const Invoice = styled.div`
  width: 8cm;
  min-height: 8cm;
  background-color: white;
  justify-content: center;
  color: black;
`;

const InvoiceHeader = styled.div``;

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

const InvoiceTotal = styled.h4``;

const PayWithCashButton = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: #a45b17;
  color: #1d1e20;
  font-weight: bold;
  cursor: pointer;
`;

const Pay = () => {
  const [totalToPay, setTotalToPay] = useState(0);
  const { cart } = useContext(CashContext);
  const { formatCurrency } = useCurrencyFormat();
  const invoiceRef = useRef<HTMLDivElement | null>(null);

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
        <ReactToPrint trigger={
          () => <PayWithCashButton>EFECTIVO</PayWithCashButton>
        }
        content={() => invoiceRef.current}
        />

      </LeftContent>
      <RightContent>
        <h3>Factura</h3>
        <Invoice ref={(el) => (invoiceRef.current = el)}>
          <InvoiceHeader></InvoiceHeader>
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
          <TotalsContainer>
            <InvoiceTotal>TOTAL: {totalToPay}</InvoiceTotal>
          </TotalsContainer>
        </Invoice>
      </RightContent>
    </>
  );
};

export default Pay;
