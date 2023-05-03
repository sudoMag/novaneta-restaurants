import { useContext } from "react";
import { KitchenContext } from "../../../context/KitchenContext"; /*
import TableIcon from "../../icons/table.svg"; */
import FoodIcon from "../../../icons/food.svg";
import CheckBox from "../../../components/CheckBox";
import PlateIcon from "../../../icons/plate.svg";
import { PayContext } from "../../../context/PayContext";
import Order from "../../../utils/types/Order";
import { CashContext } from "../../../context/CashContext";
import { CartProducts, CartsContainer, Container, ScrollFrame, SuccesButton } from "./KitchenStyles";

const Kitchen = () => {
  const { orders, endOrder } = useContext(KitchenContext);
  const { addDebt } = useContext(PayContext);
  const { cartToClient } = useContext(CashContext);

  const successOrder = (order: Order) => {
    const cart = cartToClient.find((item) => item.dbId === order.dbId);
    if (cart !== undefined) {
      console.log(cart);
      addDebt(cart, order);
      endOrder(order.thisDocId);
    }
  };

  return (
    <Container>
      <h1>cocina</h1>
      <ScrollFrame>
        <CartsContainer>
          {orders.map((order) => (
            <CartProducts
              key={order.thisDocId}
              isSucces={order.itemsNumber === order.prepared}
            >
              <header>
                <img src={FoodIcon} alt="" />
                <h3>{order.name}</h3>
                <span>
                  {order.prepared}/{order.itemsNumber}
                </span>
              </header>
              <ul>
                {order.products.map((product) => (
                  <li key={product.product.id}>
                    <CheckBox
                      orderId={order.thisDocId}
                      productId={product.product.id}
                    >
                      {product.product.name}
                    </CheckBox>
                    <span>{product.quantity}</span>
                  </li>
                ))}
              </ul>
              {order.itemsNumber === order.prepared ? (
                <SuccesButton
                  src={PlateIcon}
                  onClick={() => successOrder(order)}
                />
              ) : null}
            </CartProducts>
          ))}
        </CartsContainer>
      </ScrollFrame>
    </Container>
  );
};

export default Kitchen;
