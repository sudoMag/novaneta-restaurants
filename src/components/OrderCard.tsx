import { useState } from "react";
import { NumericFormat } from "react-number-format";
import styled from "styled-components";
import Debt from "../interfaces/Debt";
import Order from "../interfaces/Order";
import Scale from "./animations/Scale";

const Container = styled.div`
  margin: 10px 0;
  width: 90%;
  max-width: 600px;
  border-radius: 20px;
  border: solid 1px #383838;
  padding: 5px;
  background-color: #1d1e20;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  animation: ${Scale} 200ms ease-in-out;

  & h4 {
    margin: 5px;
  }
  flex-direction: column;
  align-items: center;
`;

const ProgressBar = styled.div`
  width: 90%;
  height: 4px;
`;

const Bar = styled.div<{ porcentage: number }>`
  width: 100%;
  ${({ porcentage }) => `width: ${porcentage}%`};
  height: 100%;
  background-color: var(--bg-main-color);
  background: var(--gradient-1);
  transition-duration: 400ms;
  transition-timing-function: ease-in-out;
  border-radius: 10px;
`;

const CardContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const InfoContainer = styled.div`
  ul {
    padding: 0;
    gap: 10px;
    display: grid;
  }

  li {
    padding: 5px 10px;
    border-bottom: solid 1px #353535;
    gap: 5px 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-radius: 2px;
    justify-items: center;
    align-items: center;
  }

  li H4 {
    text-align: start;
    width: 100%;
  }

  span {
    background: var(--span-gradient);
    padding: 0.3em 0.6em;
    border-radius: 15px;
    animation: ihogNa 200ms ease-in-out;
    margin: 0 5px;
  }
`;

const Total = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;

  & h4 {
    align-items: start;
  }
`;

const HeadTitlesContainer = styled.header`
  padding: 5px 10px;
  border-bottom: solid 1px #353535;
  gap: 5px 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
`;

const OrderCard = ({
  order,
  index,
  success,
  debt,
}: {
  order?: Order;
  index?: number;
  debt?: Debt;
  success: boolean;
}) => {
  const [showInfo, setShowInfo] = useState(false);

  const calcPorcentage = (A: number, B: number) => {
    return (A / B) * 100;
  };

  const viewToggle = () => {
    setShowInfo(!showInfo);
  };

  return (
    <Container onClick={viewToggle}>
      {!success && order ? (
        <>
          <CardContent>
            <h4>Cocinando</h4>
            <span>
              {order.prepared}/{order.itemsNumber}
            </span>
          </CardContent>
          <ProgressBar>
            <Bar
              porcentage={calcPorcentage(order.prepared, order.itemsNumber)}
            />
          </ProgressBar>
        </>
      ) : success && debt ? (
        <>
          <CardContent>
            <h4>Completado</h4>
            <span>
              {debt.itemsNumber}/{debt.itemsNumber}
            </span>
          </CardContent>
          <ProgressBar>
            <Bar
              porcentage={calcPorcentage(debt.itemsNumber, debt.itemsNumber)}
            />
          </ProgressBar>
        </>
      ) : null}
      {showInfo && order ? (
        <InfoContainer>
          <ul>
            {order.products.map((item, index) => (
              <li key={index}>
                {item.product.name}
                <span>{item.quantity}</span>
              </li>
            ))}
          </ul>
        </InfoContainer>
      ) : showInfo && debt ? (
        <InfoContainer>
          <HeadTitlesContainer>
            <div>Nombre</div>
            <div>Precio Unitario</div>
            <div>Cantidad</div>
          </HeadTitlesContainer>
          <ul>
            {debt.products.map((item, index) => (
              <li key={index}>
                <h4>{item.product.name}</h4>
                <div>
                  <NumericFormat
                    allowLeadingZeros
                    thousandSeparator="."
                    decimalSeparator=","
                    displayType="text"
                    value={item.product.price}
                  />
                </div>
                <span>{item.quantity}</span>
              </li>
            ))}
            <Total>
              <NumericFormat
                allowLeadingZeros
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                value={debt.amount}
                renderText={(value) => <h3>${value}</h3>}
              />
            </Total>
          </ul>
        </InfoContainer>
      ) : null}
    </Container>
  );
};

export default OrderCard;
