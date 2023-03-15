import { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import ScaleX from "./components/animations/ScaleX";
import { CashContext } from "./context/CashContext";
import CartToClient from "./interfaces/CartToClient";
import DeleteIcon from "./icons/deletex-circle.svg";
import { KitchenContext } from "./context/KitchenContext";

const ActiveButtons = css`
  padding: 10px 1em;
  border-radius: 15px;
  font-size: 1.1em;
`;

const SelectedCart = css`
  background-color: var(--bg-color);
  color: var(--bg-main-color);
  font-weight: bold;
`;

const ClientCartPillName = styled.div<{
  onSelectMode: boolean;
  active?: boolean;
}>`
  font-size: 1em;
  height: 35px;
  border-radius: 8px;
  background-color: var(--bg-main-color);
  border: 1px solid #383838;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  line-height: 1;
  padding: 0 1em;
  transform: scaleX(0);
  white-space: nowrap;
  animation: ${ScaleX} 300ms ease-in-out forwards;
  transition-duration: 500ms;
  cursor: pointer;
  ${({ active }) => {
    return active ? SelectedCart : null;
  }}

  ${({ onSelectMode }) => {
    if (onSelectMode) {
      return ActiveButtons;
    }
  }}

  & #delete {
    display: none;
    padding: 5px;
    align-items: center;
    justify-content: center;
  }

  & #number {
    display: block;
  }

  &:hover #delete {
    display: flex;
  }

  &:hover #number {
    display: none;
  }
`;

const NumberPill = styled.span`
  padding: 5px 8px;
  background-color: #414141a3;
  backdrop-filter: blur(5px);
  margin: 0 -25px 0 8px;
  border-radius: 30px;
`;

const ClientCart = ({
  cartInView,
  index,
}: {
  cartInView: CartToClient;
  index: number;
}) => {
  const { cartId, setIdforCartId, selectClientEvent, deleteCart } =
    useContext(CashContext);
  const { orders } = useContext(KitchenContext);
  const [orderProductsNumber, setOrderProductsNumber] = useState(0);

  useEffect(() => {
    const order = orders.find((item) => item.dbId === cartInView.dbId);
    console.log(cartInView.name, cartInView.dbId, order);
    if (order) {
      setOrderProductsNumber(order.itemsNumber);
    }
  }, [cartInView.dbId, cartInView.name, orders]);

  return (
    <ClientCartPillName
      onSelectMode={selectClientEvent}
      active={cartId === cartInView.dbId ? true : false}
      onClick={() => {
        if (cartInView.dbId !== cartId) {
          setIdforCartId(cartInView.dbId);
        } else if (cartInView.dbId === cartId) {
          setIdforCartId(undefined);
        }
      }}
    >
      {cartInView.name}
      {cartInView.dbId === cartId ? (
        <>
          <NumberPill id="delete" onClick={() => deleteCart(cartInView.dbId)}>
            <img src={DeleteIcon} alt="delete" />
          </NumberPill>
          <NumberPill id="number">
            {cartInView.itemsNumber + orderProductsNumber}
          </NumberPill>
        </>
      ) : cartInView.itemsNumber + orderProductsNumber !== 0 ? (
        <NumberPill>{cartInView.itemsNumber + orderProductsNumber}</NumberPill>
      ) : null}
    </ClientCartPillName>
  );
};

export default ClientCart;
