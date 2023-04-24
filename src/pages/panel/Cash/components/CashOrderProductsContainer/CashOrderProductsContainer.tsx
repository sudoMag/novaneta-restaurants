import { useContext, useEffect, useState } from "react";
import { CashContext } from "../../../../../context/CashContext";
import TrashImg from "../../../../../icons/trash.svg";
import IncreaseIcon from "../../../../../icons/increase-button.svg";
import ReduceIcon from "../../../../../icons/reduce-button.svg";
import useScroll from "../../../../../hooks/useScroll";
import ProductInCart from "../../../../../utils/types/ProductInCart";
import { KitchenContext } from "../../../../../context/KitchenContext";
import OrderCard from "../OrderCard/OrderCard";
import { PayContext } from "../../../../../context/PayContext";
import { NumericFormat } from "react-number-format";
import { BrowserView } from "react-device-detect";
import { ButtonsContainer, CardContent, Container, DeleteButton, ItemCard, NameAndPrice, QuantityPill, TotalAndButtons, TotalPrice, TrashImage } from "./CashOrderProductsContainerStyles";

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
