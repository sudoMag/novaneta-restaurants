import { useContext } from "react";
import { BrowserView } from "react-device-detect";
import { NumericFormat } from "react-number-format";
import { CashContext } from "../../../../../context/CashContext";
import { PayContext } from "../../../../../context/PayContext";
import { Container, DisableButton, OthersContainer, PayButton, ToSomeBodyButton } from "./PayBarStyles";

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
