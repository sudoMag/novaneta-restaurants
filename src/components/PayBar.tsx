import { useContext } from "react";
import { BrowserView, isMobile } from "react-device-detect";
import { NumericFormat } from "react-number-format";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { CashContext } from "../context/CashContext";
import { PayContext } from "../context/PayContext";

const Container = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;

  & h1 {
    margin: 10px;
    white-space: nowrap;
    ${isMobile
      ? css`
          width: 100%;
          text-align: center;
        `
      : null}
  }

  & span {
    font-size: 1.6em;
    ${isMobile ? "font-size: 1.3em;" : null}
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
  const { selectEventToggle } = useContext(CashContext);
  const { totalToPay } = useContext(PayContext);

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
        <BrowserView>Total a Pagar: </BrowserView>
        <span>
          ${" "}
          <NumericFormat
            allowLeadingZeros
            thousandSeparator="."
            decimalSeparator=","
            displayType="text"
            value={totalToPay}
          />
        </span>
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
