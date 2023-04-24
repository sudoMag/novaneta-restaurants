import styled from "styled-components";
import Scale from "../../../../components/animations/Scale";

export const ClientList = styled.ul`
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 0;
  justify-items: center;
  width: 70%;

  & li {
    cursor: pointer;
    display: block;
    background-color: #8080803d;
    padding: 5px 20px;
    border-radius: 10px;
    animation: ${Scale} 200ms ease-in-out;
  }

  & li span {
    color: var(--bg-main-color);
    font-weight: bold;
  }
`;

export const SearchClientsBox = styled.div`
  padding: 5px 10px;
  background-color: #76767642;
  border-radius: 10px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NewClientButton = styled.img`
  border-radius: 8px;
  padding: 10px 10px;
  background-color: var(--bg-color);
  border: 1px solid #383838;
  margin: 10px 20px;
  cursor: pointer;
`;

export const InputsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
