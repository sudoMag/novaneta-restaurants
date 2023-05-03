import styled, { css } from "styled-components";
import Opacity from "../../../components/animations/Opacity";
import { ItemCard } from "../Cash/components/CashOrderProductsContainer/CashOrderProductsContainerStyles";

export const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const CartsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-x: auto;
`;

export const SuccesStyle = css`
  box-shadow: 1px 0px 30px var(--bg-main-color);
  border: solid 1px #21c21d;
`;

export const CartProducts = styled(ItemCard)<{ isSucces: boolean }>`
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

export const SuccesButton = styled.img`
  background-color: #045e04;
  height: 35px;
  width: 90%;
  padding: 10px 0;
  margin: 10px;
  border-radius: 10px;
  opacity: 0;
  animation: ${Opacity} 200ms ease-in-out forwards;
  cursor pointer;
`;

export const ScrollFrame = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
`;
