import { useContext } from "react";
import { CashContext } from "../../../../../../../context/CashContext";
import CartToClient from "../../../../../../../utils/types/CartToClient";
import DeleteIcon from "../../../../../../../icons/deletex-circle.svg";
import { ClientCartPillName, NumberPill } from "./ClientCartStyles";
import useProductsNumber from "./hooks/useProductsNumber";

const ClientCart = ({
  cartInView,
  index,
}: {
  cartInView: CartToClient;
  index: number;
}) => {
  const { cartId, setIdforCartId, selectClientEvent, deleteCart } =
    useContext(CashContext);
  const { orderProductsNumber, debtProductsNumber } =
    useProductsNumber(cartInView);

  return (
    <ClientCartPillName
      SelectMode={selectClientEvent}
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
            {cartInView.itemsNumber + orderProductsNumber + debtProductsNumber}
          </NumberPill>
        </>
      ) : cartInView.itemsNumber + orderProductsNumber + debtProductsNumber !==
        0 ? (
        <NumberPill>
          {cartInView.itemsNumber + orderProductsNumber + debtProductsNumber}
        </NumberPill>
      ) : null}
    </ClientCartPillName>
  );
};

export default ClientCart;
