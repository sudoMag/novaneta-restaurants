import { useContext } from "react";
import ClientCart from "./components/ClientCart/ClientCart";
import { CashContext } from "../../../../../context/CashContext";
import newCartIcon from "../../../../../icons/newcart.svg";
import {
  ClientCartButton,
  ClientCartsContainer,
  Container,
  NewCartButton,
  NewCartName,
} from "./CartsBarStyles";
import useScrollWheel from "../../../../../hooks/useScrollWheel";
import useCartName from "./hooks/useCartName";

const CartsBar = () => {
  const { cartToClient, selectClientEvent } = useContext(CashContext);
  const { name, showNameInput, inputViewToggle, handleName, handleSubmmit } =
    useCartName();
  const { ScrollRef, scrollToLeft, wheelHandler } = useScrollWheel();

  return (
    <Container className="noselect" SelectMode={selectClientEvent}>
      <NewCartButton src={newCartIcon} onClick={inputViewToggle} />
      {showNameInput ? (
        <ClientCartButton SelectMode={selectClientEvent}>
          <NewCartName
            value={name}
            onChange={handleName}
            onKeyDown={(e) => handleSubmmit(e, () => scrollToLeft())}
            placeholder="Nombre"
          />
        </ClientCartButton>
      ) : null}
      <ClientCartsContainer
        ref={(el) => (ScrollRef.current = el)}
        onWheel={wheelHandler}
      >
        {cartToClient.map((cart, index) => (
          <ClientCart key={index} cartInView={cart} index={index} />
        ))}
      </ClientCartsContainer>
    </Container>
  );
};

export default CartsBar;
