import { useContext } from "react";
import styled, { css } from "styled-components";
import ScaleX from "./components/animations/ScaleX";
import { CashContext } from "./context/CashContext";
import CartToClient from "./interfaces/CartToClient";

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
  const { cartId, setIdforCartId, selectClientEvent } = useContext(CashContext);

  return (
    <ClientCartPillName
      onSelectMode={selectClientEvent}
      active={cartId === index ? true : false}
      onClick={() => {
        if (cartInView.id !== cartId) {
          setIdforCartId(cartInView.id);
        } else if (cartInView.id === cartId) {
          setIdforCartId(undefined);
        }
      }}
    >
      {cartInView.name}
      {cartInView.itemsNumber !== 0 ? (
        <NumberPill>{cartInView.itemsNumber}</NumberPill>
      ) : null}
    </ClientCartPillName>
  );
};

export default ClientCart;
