import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CashContext } from "../context/CashContext";
import useCurrencyFormat from "../hooks/useCurrencyFormat";

const Container = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;

  & h1 {
    margin: 10px;
    white-space: nowrap;
  }

  & span {
    font-size: 1.6em;
  }
`;

const PayButton = styled(NavLink)`
  padding: 10px;
  background-color: var(--bg-main-color);
  border-radius: 10px;
  margin: 10px;
  font-weight: bold;
  color: #1d1e20;
  cursor: pointer;
  text-decoration: none;
`;

const DisableButton = styled.div`
  padding: 10px;
  background-color: #414141;
  border-radius: 10px;
  margin: 10px;
  font-weight: bold;
  color: #1d1e20;
`;

const ToSomeBodyButton = styled.div`
  padding: 10px;
  background-color: var(--bg-main-color);
  border-radius: 10px;
  margin: 10px;
  font-weight: bold;
  color: #1d1e20;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
`;

const OthersContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const PayBar = () => {
  const [totalToPay, setTotalToPay] = useState(0);
  const { cart, cartToClient, cartId, selectEventToggle } =
    useContext(CashContext);
  const { formatCurrency } = useCurrencyFormat();

  useEffect(() => {
    let total = 0;
    if (cartId === undefined) {
      cart.forEach((item) => {
        total += item.product.price * item.quantity;
      });
      setTotalToPay(total);
    } else {
      cartToClient[cartId].products.forEach((item) => {
        total += item.product.price * item.quantity;
      });
      setTotalToPay(total);
    }
  }, [cart, cartId, cartToClient]);

  return (
    <Container>
      <OthersContainer>
        {totalToPay === 0 ? (
          <DisableButton className="disable">Enviar A</DisableButton>
        ) : (
          <ToSomeBodyButton onClick={selectEventToggle}>
            Enviar A
          </ToSomeBodyButton>
        )}
      </OthersContainer>
      <h1>
        Total a Pagar: <span>$ {formatCurrency("CLP", totalToPay)}</span>
      </h1>
      {totalToPay === 0 ? (
        <DisableButton className="disable">Siguiente</DisableButton>
      ) : (
        <PayButton to="/panel/cash/pay">Siguiente</PayButton>
      )}
    </Container>
  );
};

export default PayBar;
