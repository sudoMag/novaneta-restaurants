import { useState } from "react";
import styled from "styled-components";
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
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
  }

  span {
    background-color: #680568;
    padding: 0.3em 0.6em;
    border-radius: 15px;
    animation: ihogNa 200ms ease-in-out;
    margin: 0 5px;
  }
`;

const OrderCard = ({ order, index }: { order: Order; index: number }) => {
  const [showInfo, setShowInfo] = useState(false);

  const calcPorcentage = (A: number, B: number) => {
    return (A / B) * 100;
  };

  const viewToggle = () => {
    setShowInfo(!showInfo);
  };

  return (
    <Container onClick={viewToggle}>
      <CardContent>
        <h4>Cocinando</h4>
        <span>
          {order.prepared}/{order.itemsNumber}
        </span>
      </CardContent>
      <ProgressBar>
        <Bar porcentage={calcPorcentage(order.prepared, order.itemsNumber)} />
      </ProgressBar>
      {showInfo ? (
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
      ) : null}
    </Container>
  );
};

export default OrderCard;
