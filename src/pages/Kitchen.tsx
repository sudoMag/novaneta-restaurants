import { useContext } from "react";
import styled from "styled-components";
import { KitchenContext } from "../context/KitchenContext";

const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartsContainer = styled.div``;

const CartProducts = styled.div``;

const Kitchen = () => {
  const { orders } = useContext(KitchenContext);
  console.log(orders);

  return (
    <Container>
      <h1>cocina</h1>
      <CartsContainer>
        {orders.map((order) => (
          <CartProducts key={order.id}>
            <h3>{order.name}</h3>
            <ul>
              {order.products.map((product) => (
                <li key={product.product.id}>{product.product.name}</li>
              ))}
            </ul>
          </CartProducts>
        ))}
      </CartsContainer>
    </Container>
  );
};

export default Kitchen;
