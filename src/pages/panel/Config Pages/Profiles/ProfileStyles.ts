import styled from "styled-components";
import OpacityAndTranslate from "../../../../components/animations/OpacityAndTranslate";
import { Link } from "react-router-dom";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
`;

export const CartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Card = styled.div`
  background-color: var(--bg-color);
  margin: 10px 0;
  border: 1px solid #383838;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 90%;
  min-height: 80px;
  border-radius: 10px;
  opacity: 0;
  animation: ${OpacityAndTranslate} 300ms ease-in-out forwards;

  & img {
    margin: 10px;
  }

  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 20px;
  }

  & span {
    background-color: #712652;
    padding: 5px 10px;
    border-radius: 10px;
    box-shadow: 0px 1px 30px #e40064;
    margin: 0 20px;
    line-height: 1;
  }

  & h2 {
    line-height: 1;
  }
`;

export const NewProfileButton = styled(Link)`
  background-color: var(--bg-main-color);
  border: 1px solid #383838;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  margin: 15px 0;
  cursor: pointer;
  font-weight: bold;
  color: var(--font-color);
  text-decoration: none;
`;
