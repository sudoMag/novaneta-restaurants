import { useContext } from "react";
import styled from "styled-components";
import { CashContext } from "../context/CashContext";
import useCurrencyFormat from "../hooks/useCurrencyFormat";
import TrashImg from "../icons/trash.svg";
import IncreaseIcon from "../icons/increase-button.svg";
import ReduceIcon from "../icons/reduce-button.svg";


const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 100%;
  width: 100%;

  & h3 {
    margin: 0 0 5px;
  }
`;

const CardContent = styled.div`
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
  border: 1px solid gray;
  padding: 5px;
  background: #444048;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  & h4 {
    margin: 5px;
  }
`;

const NameAndPrice = styled.div`
  & h4 {
  }

  & span {
    margin: 0.2em 0.5em;
  }
`;

const QuantityPill = styled.div`
  background-color: #680568;
  padding: 0.3em 0.6em;
  border-radius: 15px;
  margin-top: -20px;
  margin-left: -20px;
`;

const TotalAndButtons = styled.div`
  display: flex;
  height: 100%;
  align-items: stretch;
`;

const TotalPrice = styled.h4`
  margin: 0;
`;

const ButtonsContainer = styled.div`
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
    background-color: #ff00d4;
  }

  & #button-reduce {
    background-color: #a45b17;
  }
`;

const TrashImage = styled.img`
  width: 20px;
`;

const DeleteButton = styled.div`
  padding: 8px;
  background-color: #a45b17;
  display: flex;
  border-radius: 15px;
  cursor: pointer;
`;

const CashBox = () => {
  const { cart, increaseQuantity, reduceQuantity, removeToCart } =
    useContext(CashContext);
  const { formatCurrency } = useCurrencyFormat();

  return (
    <Container>
      {cart.map((item) => {
        return (
          <ItemCard key={item.product.id}>
            <QuantityPill>{item.quantity}</QuantityPill>
            <CardContent>
              <NameAndPrice>
                <h4>{item.product.name}</h4>
                <span>$ {formatCurrency("CLP", item.product.price)}</span>
              </NameAndPrice>
              <TotalAndButtons>
                <TotalPrice>
                  Total:
                  $ {formatCurrency("CLP", item.product.price * item.quantity)}
                </TotalPrice>
                <ButtonsContainer>
                  <img
                    src={IncreaseIcon}
                    id="button-increase"
                    onClick={() => increaseQuantity(item.product.id)}
                    alt="increase"
                  />
                  <img
                    src={ReduceIcon}
                    id="button-reduce"
                    onClick={() => reduceQuantity(item.product.id)}
                    alt="reduce"
                  />
                </ButtonsContainer>
                <DeleteButton onClick={() => removeToCart(item.product.id)}>
                  <TrashImage src={TrashImg} />
                </DeleteButton>
              </TotalAndButtons>
            </CardContent>
          </ItemCard>
        );
      })}
    </Container>
  );
};

export default CashBox;