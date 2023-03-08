import {
  ChangeEvent,
  useContext,
  useState,
  KeyboardEvent,
  WheelEvent,
  useRef,
} from "react";
import styled from "styled-components";
import { CashContext } from "../context/CashContext";
import useScroll from "../hooks/useScroll";
import newCartIcon from "../icons/newcart.svg";
import Opacity from "./animations/Opacity";
import ScaleX from "./animations/ScaleX";

const Container = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;

  & h1 {
    margin: 10px;
  }

  & span {
    font-size: 1.6em;
  }
`;

const NewCartButton = styled.img`
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

const ClientCart = styled.div`
  height: 35px;
  border-radius: 8px;
  background-color: #112030;
  border: 1px solid #383838;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  padding: 0 1em;
  transform: scaleX(0);
  white-space: nowrap;
  animation: ${ScaleX} 300ms ease-in-out forwards;
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
  const { cart, cartToClient, addToClientCart } = useContext(CashContext);
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
      addToClientCart(cart, name);
      setName("");
      setShowNameInput(false);
      scrollToLeft();
    }
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const wheelHandler = (e: WheelEvent<HTMLDivElement>) => {
    console.log(scrollNumber.current, ScrollRef.current?.clientWidth);
    if (ScrollRef.current && e.deltaY === 100) {
      ScrollRef.current.scrollLeft =
        scrollNumber.current > (ScrollRef.current.clientWidth)
          ? ScrollRef.current.clientWidth
          : (scrollNumber.current += 10);
    }
    if (ScrollRef.current && e.deltaY === -100) {
      ScrollRef.current.scrollLeft =
        scrollNumber.current < 0 ? 0 : (scrollNumber.current -= 10);
    }
  };

  return (
    <Container>
      <NewCartButton src={newCartIcon} onClick={nameToggle} />
      {showNameInput ? (
        <ClientCart>
          <NewCartName
            value={name}
            onChange={handleName}
            onKeyDown={(e) => handleSubmmit(e)}
            placeholder="Nombre"
          />
        </ClientCart>
      ) : null}
      <ClientCartsContainer
        ref={(el) => (ScrollRef.current = el)}
        onWheel={wheelHandler}
      >
        {cartToClient.map((cart, index) => (
          <ClientCart key={index}>{cart.name}</ClientCart>
        ))}
      </ClientCartsContainer>
    </Container>
  );
};

export default CartsBar;
