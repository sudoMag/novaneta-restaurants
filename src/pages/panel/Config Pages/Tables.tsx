import { useContext } from "react";
import styled from "styled-components";
import { CashContext } from "../../../context/CashContext";
import TableIcon from "../../../icons/table.svg";
import FoodIcon from "../../../icons/food.svg";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
`;

const TablesContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  padding: 5px;
  border-radius: 10px;
  background-color: var(--bg-main-color);
  margin: 0 10px;
`;

const Table = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--bg-color);
  border: solid 1px #383838;
  width: 70%;
  border-radius: 10px;
  margin: 5px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  & span {
    background-color: #5f5f5f52;
    padding: 5px 10px;
    line-height: 1;
    border-radius: 10px;
    color: var(--bg-main-color);
    font-weight: bold;
    margin: 0 15px;
  }

  & h1 {
    margin: 15px 30px;
  }
`;

const Tables = () => {
  const { cartToClient } = useContext(CashContext);
  return (
    <Container>
      <h1>Mesas</h1>
      <TablesContainer>
        {cartToClient.map((cart) => {
          return (
            <Table>
              <Icon
                src={cart.type === "to go" ? FoodIcon : TableIcon}
                title={cart.type === "to go" ? "para llevar" : "en mesa"}
              />
              <InfoContainer>
                <h1>{cart.name}</h1>
                <span>
                  {cart.status === "empty"
                    ? "Libre"
                    : cart.status === "ordering"
                    ? "Ordenando"
                    : "Esperando"}
                </span>
              </InfoContainer>
            </Table>
          );
        })}
      </TablesContainer>
    </Container>
  );
};

export default Tables;
