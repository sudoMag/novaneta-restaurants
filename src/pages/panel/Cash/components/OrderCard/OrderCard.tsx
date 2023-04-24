import { useState } from "react";
import { NumericFormat } from "react-number-format";
import Debt from "../../../../../utils/types/Debt";
import Order from "../../../../../utils/types/Order";
import { calcPorcentage } from "../../../../../utils/services/calcPorcentage";
import { Bar, CardContent, Container, HeadTitlesContainer, InfoContainer, ProgressBar, Total } from "./OrderCardStyles";

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
