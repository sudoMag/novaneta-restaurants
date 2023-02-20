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
  }

  & span {
    font-size: 1.6em;
  }
`;

const PayButton = styled(NavLink)`
  padding: 10px;
  background-color: #a45b17;
  border-radius: 10px;
  margin: 10px;
  font-weight: bold;
  color: #1D1E20;
  cursor: pointer;
  text-decoration: none;
`;

const PayBar = () => {
  const [totalToPay, setTotalToPay] = useState(0);
  const { cart } = useContext(CashContext);
  const { formatCurrency } = useCurrencyFormat();

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setTotalToPay(total);
  }, [cart]);

  return (
    <Container>
      <h1>
        Total a Pagar: <span>$ {formatCurrency("CLP", totalToPay)}</span>
      </h1>
      <PayButton to="/cash/pay">Pagar</PayButton>
    </Container>
  );
};

export default PayBar;
