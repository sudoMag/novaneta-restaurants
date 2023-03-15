import { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { KitchenContext } from "../context/KitchenContext";
import CheckIcon from "../icons/check.svg";

const CheckedText = css`
  text-decoration: line-through;
  color: #3e3e3e;
`;

const Check = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;

  & div.check-disable {
    background-color: var(--bg-color);
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: 2px solid #424242;
    cursor: pointer;
  }

  h4 {
    max-width: 150px;
    ${({ isActive }) => (isActive ? CheckedText : null)}
  }

  h4:hover {
    text-decoration: line-through;
  }
`;

const CheckImg = styled.img`
  background-color: var(--bg-main-color);
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 2px solid #424242;
  cursor: pointer;
`;

const CheckBox = ({
  children,
  orderId,
  productId,
}: {
  children: string;
  orderId: string;
  productId: string;
}) => {
  const [isActive, setIsActive] = useState(false);
  const { increaseQuantity, reduceQuantity, orders } =
    useContext(KitchenContext);

  const ActiveToggle = () => {
    if (isActive === true) {
      reduceQuantity(orderId, productId);
    } else {
      increaseQuantity(orderId, productId);
    }
  };

  useEffect(() => {
    const order = orders.find((item) => item.thisDocId === orderId);
    console.log(order);
    if (order !== undefined) {
      const isInList = order.preparedList.findIndex((item) => item === productId);
      if (isInList === -1) {
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    }
  }, [orderId, orders, productId]);

  return (
    <Check onClick={ActiveToggle} isActive={isActive}>
      {isActive ? (
        <CheckImg src={CheckIcon} />
      ) : (
        <div className="check-disable" />
      )}
      <h4>{children}</h4>
    </Check>
  );
};

export default CheckBox;
