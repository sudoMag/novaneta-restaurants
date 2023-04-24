import styled from "styled-components";
import Scale from "../../../../../components/animations/Scale";

export const Container = styled.section`
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

export const CardContent = styled.div`
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

export const NameAndPrice = styled.div`
  & h4 {
  }

  & span {
    margin: 0.2em 0.5em;
  }
`;

export const QuantityPill = styled.div`
  background: var(--span-gradient);
  padding: 0.3em 0.6em;
  border-radius: 15px;
  margin-top: -20px;
  margin-left: -20px;
  animation: ${Scale} 200ms ease-in-out;
`;

export const TotalAndButtons = styled.div`
  display: flex;
  height: 100%;
  align-items: stretch;
`;

export const TotalPrice = styled.h4`
  margin: 0;
`;

export const ButtonsContainer = styled.div`
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

export const TrashImage = styled.img`
  width: 20px;
`;

export const DeleteButton = styled.div`
  padding: 8px;
  background-color: var(--bg-main-color);
  background: var(--gradient-1);
  display: flex;
  border-radius: 15px;
  cursor: pointer;
`;
