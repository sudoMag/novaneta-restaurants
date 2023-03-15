import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LeftContent, RightContent } from "../../components/SplittedPanel";
import { CashContext } from "../../context/CashContext";
import useCurrencyFormat from "../../hooks/useCurrencyFormat";
import Logo from "../../icons/logowhite.svg";
import LogoBlack from "../../icons/logoblack.svg";
import ReactToPrint from "react-to-print";
import { UserContext } from "../../context/UserContext";
import ProductInCart from "../../interfaces/ProductInCart";
import { KitchenContext } from "../../context/KitchenContext";
import CartToClient from "../../interfaces/CartToClient";

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
  background-color: var(--bg-main-color);
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

const Pay = () => {
  const [totalToPay, setTotalToPay] = useState(0);
  const [cartInView, setCartInView] = useState<ProductInCart[]>([]);
  const { cart, cartToClient, selectedCart } = useContext(CashContext);
  const { formatCurrency } = useCurrencyFormat();
  const invoiceRef = useRef<HTMLDivElement | null>(null);
  const { userData } = useContext(UserContext);
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

  useEffect(() => {
    let total = 0;
    if (selectedCart === -1) {
      cart.forEach((item) => {
        total += item.product.price * item.quantity;
      });
      setTotalToPay(total);
    } else {
      cartToClient[selectedCart].products.forEach((item) => {
        total += item.product.price * item.quantity;
      });
      if (ordersInView !== undefined) {
        ordersInView.forEach((order) => {
          order.products.forEach((item) => {
            total += item.product.price * item.quantity;
          });
        })
      }
      setTotalToPay(total);
    }
  }, [selectedCart, cartToClient, cart, ordersInView]);

  useEffect(() => {
    if (selectedCart === -1) {
      setCartInView(cart);
    } else {
      setCartInView(cartToClient[selectedCart].products);
    }
  }, [cart, selectedCart, cartToClient]);

  return (
    <>
      <LeftContent>
        <img src={Logo} alt="logo novaneta" />
        <h3>datos</h3>
        <h1>
          Total a Pagar: <span>$ {formatCurrency("CLP", totalToPay)}</span>
        </h1>
        {cartInView.length !== 0 ? (
          <ReactToPrint
            trigger={() => <PrintButton>IMPRIMIR</PrintButton>}
            content={() => invoiceRef.current}
          />
        ) : null}
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
              ? ordersInView.map((order) => (
                order.products.map((item) => {
                  return (
                    <Item key={item.product.id}>
                      x{item.quantity} {item.product.name}
                      <ItemPrice>{item.product.price}</ItemPrice>
                    </Item>
                  );
                })
              ))
              : null}
            {cartInView.map((item) => {
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
