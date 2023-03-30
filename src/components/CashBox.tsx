import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CashContext } from "../context/CashContext";
import TrashImg from "../icons/trash.svg";
import IncreaseIcon from "../icons/increase-button.svg";
import ReduceIcon from "../icons/reduce-button.svg";
import Scale from "./animations/Scale";
import useScroll from "../hooks/useScroll";
import ProductInCart from "../interfaces/ProductInCart";
import { KitchenContext } from "../context/KitchenContext";
import OrderCard from "./OrderCard";
import { PayContext } from "../context/PayContext";
import { NumericFormat } from "react-number-format";
import { BrowserView } from "react-device-detect";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 100%;
  width: 100%;
  scroll-behavior: smooth;
  padding-top: 10px;

  &::-webkit-scrollbar {
    display: none;
  }

  & h3 {
    margin: 0 0 5px;
  }
`;

const CardContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const ItemCard = styled.div`
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
`;

const NameAndPrice = styled.div`
  & h4 {
  }

  & span {
    margin: 0.2em 0.5em;
  }
`;

const QuantityPill = styled.div`
  background: var(--span-gradient);
  padding: 0.3em 0.6em;
  border-radius: 15px;
  margin-top: -20px;
  margin-left: -20px;
  animation: ${Scale} 200ms ease-in-out;
`;

const TotalAndButtons = styled.div`
  display: flex;
  height: 100%;
  align-items: stretch;
`;

const TotalPrice = styled.h4`
  margin: 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;

  & img {
    padding: 1px 8px;
    text-align: center;
    margin: 5px;
    border-radius: 8px;
    cursor: pointer;
  }

  & #button-increase {
    background: var(--span-gradient);
  }

  & #button-reduce {
    background-color: var(--bg-main-color);
    background: var(--gradient-1);
  }
`;

const TrashImage = styled.img`
  width: 20px;
`;

const DeleteButton = styled.div`
  padding: 8px;
  background-color: var(--bg-main-color);
  background: var(--gradient-1);
  display: flex;
  border-radius: 15px;
  cursor: pointer;
`;

const CashBox = () => {
  const {
    cart,
    cartToClient,
    selectedCart,
    increaseQuantity,
    reduceQuantity,
    removeToCart,
  } = useContext(CashContext);
  const { ordersInView } = useContext(KitchenContext);
  const { debtsInView } = useContext(PayContext);
  const [CartInView, setCartInView] = useState<ProductInCart[]>([]);
  const { ScrollRef, scrollToTop } = useScroll();

  useEffect(() => {
    scrollToTop();
  }, [scrollToTop]);

  useEffect(() => {
    if (selectedCart === -1) {
      setCartInView(cart);
    } else if (selectedCart !== -1) {
      setCartInView(cartToClient[selectedCart].products);
    }
  }, [cart, cartToClient, selectedCart]);

  return (
    <Container ref={(el) => (ScrollRef.current = el)}>
      {CartInView.length === 0 &&
      ordersInView?.length === 0 &&
      debtsInView.length === 0 ? (
        <img src="/enpty cart.png" alt="" />
      ) : null}
      {ordersInView !== undefined
        ? ordersInView.map((order, index) => (
            <OrderCard
              key={index}
              order={order}
              index={index}
              success={false}
            />
          ))
        : null}
      {debtsInView.length !== 0
        ? debtsInView.map((debt, index) => (
            <OrderCard key={index} success debt={debt} />
          ))
        : null}
      {CartInView.map((item) => {
        return (
          <ItemCard key={item.product.id}>
            <QuantityPill>{item.quantity}</QuantityPill>
            <CardContent>
              <NameAndPrice>
                <h4>{item.product.name}</h4>
                <span>
                  ${" "}
                  <NumericFormat
                    allowLeadingZeros
                    thousandSeparator="."
                    decimalSeparator=","
                    displayType="text"
                    value={item.product.price}
                  />
                </span>
              </NameAndPrice>
              <TotalAndButtons>
                <TotalPrice>
                  <BrowserView>Total: $ </BrowserView>
                  <NumericFormat
                    allowLeadingZeros
                    thousandSeparator="."
                    decimalSeparator=","
                    displayType="text"
                    value={item.product.price * item.quantity}
                  />
                </TotalPrice>
                <ButtonsContainer>
                  <img
                    src={IncreaseIcon}
                    id="button-increase"
                    onClick={() => increaseQuantity(item.product.id)}
                    alt="increase"
                  />
                  <img
                    src={ReduceIcon}
                    id="button-reduce"
                    onClick={() => reduceQuantity(item.product.id)}
                    alt="reduce"
                  />
                </ButtonsContainer>
                <DeleteButton onClick={() => removeToCart(item.product.id)}>
                  <TrashImage src={TrashImg} />
                </DeleteButton>
              </TotalAndButtons>
            </CardContent>
          </ItemCard>
        );
      })}
    </Container>
  );
};

export default CashBox;
