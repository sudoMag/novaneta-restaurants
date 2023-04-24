import { useContext, useState, ChangeEvent, KeyboardEvent } from "react";
import { CashContext } from "../../../../context/CashContext";
import TableIcon from "../../../../icons/table.svg";
import FoodIcon from "../../../../icons/food.svg";
import { PayContext } from "../../../../context/PayContext";
import { KitchenContext } from "../../../../context/KitchenContext";
import { Container } from "../Profiles/ProfileStyles";
import {
  Icon,
  InfoContainer,
  NewTableButton,
  NewTableInput,
  Table,
  TablesContainer,
} from "./TablesStyles";

const Tables = () => {
  const [newTable, setNewTable] = useState({ toggle: false, name: "" });

  const { cartToClient, createClientCart } = useContext(CashContext);
  const { debts } = useContext(PayContext);
  const { orders } = useContext(KitchenContext);

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTable({ ...newTable, name: e.currentTarget.value });
  };

  const nameToggle = () => {
    setNewTable({ ...newTable, toggle: !newTable.toggle });
  };

  const handleSubmmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTable.name !== "") {
      createClientCart(newTable.name, "in table");
      setNewTable({ toggle: false, name: "" });
    }
  };

  return (
    <Container>
      <h1>Mesas</h1>
      <TablesContainer>
        {cartToClient.map((cart, index) => {
          const inDebts = debts.find((item) => item.dbId === cart.dbId);
          const inKitchen = orders.find((item) => item.dbId === cart.dbId);

          return (
            <Table key={index}>
              <Icon
                src={cart.type === "to go" ? FoodIcon : TableIcon}
                title={cart.type === "to go" ? "para llevar" : "en mesa"}
              />
              <InfoContainer>
                <h1>{cart.name}</h1>
                <span>
                  {inDebts && inDebts.status === "debt"
                    ? "Por Pagar"
                    : inKitchen
                    ? "En Cocina"
                    : cart.status === "empty"
                    ? "Libre"
                    : cart.status === "ordering"
                    ? "Ordenando"
                    : "Libre"}
                </span>
              </InfoContainer>
            </Table>
          );
        })}
      </TablesContainer>
      {newTable.toggle === true ? (
        <NewTableInput
          value={newTable.name}
          onChange={(e) => handleName(e)}
          onKeyDown={(e) => handleSubmmit(e)}
        />
      ) : (
        <NewTableButton onClick={nameToggle}>Añadir Mesa</NewTableButton>
      )}
    </Container>
  );
};

export default Tables;
