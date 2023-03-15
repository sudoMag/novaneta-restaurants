import { useContext } from "react";
import styled, {css} from "styled-components";
import { ItemCard } from "../../components/CashBox";
import { KitchenContext } from "../../context/KitchenContext";
import TableIcon from "../../icons/table.svg";
import FoodIcon from "../../icons/food.svg";
import CheckBox from "../../components/CheckBox";
import PlateIcon from "../../icons/plate.svg";
import Opacity from "../../components/animations/Opacity";

const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CartsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-x: auto;
`;

const SuccesStyle = css`
  box-shadow: 1px 0px 30px var(--bg-main-color);
  border: solid 1px #21c21d;
`;

const CartProducts = styled(ItemCard)<{ isSucces: boolean }>`
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin: 5px;
  width: 300px;
  ${({ isSucces }) => (isSucces ? SuccesStyle : null)}

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

  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  header img {
    background-color: var(--bg-main-color);
    padding: 5px;
    border-radius: 10px;
  }
`;

const SuccesButton = styled.img`
  background-color: #045e04;
  height: 35px;
  width: 90%;
  padding: 10px 0;
  margin: 10px;
  border-radius: 10px;
  opacity: 0;
  animation: ${Opacity} 200ms ease-in-out forwards;
`;

const ScrollFrame = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
`;

const Kitchen = () => {
  const { orders } = useContext(KitchenContext);

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
                <SuccesButton src={PlateIcon} />
              ) : null}
            </CartProducts>
          ))}
        </CartsContainer>
      </ScrollFrame>
    </Container>
  );
};

export default Kitchen;
