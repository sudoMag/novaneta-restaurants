import {
  ChangeEvent,
  useContext,
  useState,
  KeyboardEvent,
  WheelEvent,
  useRef,
} from "react";
import styled, { css } from "styled-components";
import ClientCart from "../ClientCart";
import { CashContext } from "../context/CashContext";
import useScroll from "../hooks/useScroll";
import newCartIcon from "../icons/newcart.svg";
import Opacity from "./animations/Opacity";
import ScaleX from "./animations/ScaleX";

const ActiveMode = css`
  background: #2f2f2fc2;
  padding: 10px 0;
`;

const ActiveButtons = css`
  padding: 10px 1em;
  border-radius: 15px;
  font-size: 1.1em;
`;

const SelectedCart = css`
  background-color: var(--bg-color);
  color: var(--bg-main-color);
  font-weight: bold;
`;

const Container = styled.section<{ SelectMode: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  border-radius: 10px;
  transition-duration: 400ms;

  ${({ SelectMode }) => {
    if (SelectMode) {
      return ActiveMode;
    }
  }}

  & h1 {
    margin: 10px;
  }
`;

const NewCartButton = styled.img`
  border-radius: 8px;
  padding: 10px 10px;
  background-color: var(--bg-main-color);
  border: 1px solid #383838;
  margin: 10px 20px;
  cursor: pointer;
`;

const ClientCartsContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ClientCartButton = styled.div<{ SelectMode: boolean; active?: boolean }>`
  height: 35px;
  border-radius: 8px;
  background-color: var(--bg-main-color);
  border: 1px solid #383838;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  line-height: 1;
  padding: 0 1em;
  transform: scaleX(0);
  white-space: nowrap;
  animation: ${ScaleX} 300ms ease-in-out forwards;
  transition-duration: 500ms;
  cursor: pointer;
  ${({ active }) => {
    return active ? SelectedCart : null;
  }}

  ${({ SelectMode }) => {
    if (SelectMode) {
      return ActiveButtons;
    }
  }}
`;

const NewCartName = styled.input`
  height: 35px;
  min-width: 65px;
  border: none;
  text-align: center;
  background-color: transparent;
  color: white;
  opacity: 0;
  animation: ${Opacity} 300ms 500ms ease-in-out forwards;

  &:focus-visible {
    outline: none;
  }
`;

const CartsBar = () => {
  const { cartToClient, selectClientEvent, createClientCart } =
    useContext(CashContext);
  const [showNameInput, setShowNameInput] = useState(false);
  const [name, setName] = useState("");
  const { ScrollRef, scrollToLeft } = useScroll();
  const scrollNumber = useRef<number>(0);

  const nameToggle = () => {
    setShowNameInput(!showNameInput);
    setName("");
  };

  const handleSubmmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && name !== "") {
      createClientCart(name, "to go");
      setName("");
      setShowNameInput(false);
      scrollToLeft();
    }
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const wheelHandler = (e: WheelEvent<HTMLDivElement>) => {
    if (ScrollRef.current && e.deltaY === 100) {
      ScrollRef.current.scrollLeft =
        scrollNumber.current > ScrollRef.current.clientWidth
          ? ScrollRef.current.clientWidth
          : (scrollNumber.current += 10);
    }
    if (ScrollRef.current && e.deltaY === -100) {
      ScrollRef.current.scrollLeft =
        scrollNumber.current < 0 ? 0 : (scrollNumber.current -= 10);
    }
  };

  return (
    <Container className="noselect" SelectMode={selectClientEvent}>
      <NewCartButton src={newCartIcon} onClick={nameToggle} />
      {showNameInput ? (
        <ClientCartButton SelectMode={selectClientEvent}>
          <NewCartName
            value={name}
            onChange={handleName}
            onKeyDown={(e) => handleSubmmit(e)}
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
