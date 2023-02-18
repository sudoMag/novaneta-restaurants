import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useWithdrawals from "./hooks/useWithdrawals";
import { User } from "firebase/auth";
import { Link } from "react-router-dom";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ListContainer = styled.section`
  display: flex;
  flex-direction: column;

  & ul {
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  & li {
    display: flex;
    text-decoration: none;
    width: 100%;
  }
`;

const Card = styled.article`
  line-height: 1;
  font-weight: bold;
  border-radius: 10px;
  border: 2px solid black;
  padding: 30px;
  width: 100%;
  margin: 20px;
`;

const Weight = styled.h2`
  margin: 5px;
`;

const PayState = styled.h5`
  margin: 5px;
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Date = styled.h5`
  margin: 5px;
`;

const PriceBar = styled.div`
  position: sticky;
  width: 100%;
  height: 50px;
  background-color: white;
  top: 0px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & h4 {
    margin: 10px 30px;
    line-height: 1;

    & span {
      padding: 0.2em 0.8em;
      background-color: #3f15d6;
      border-radius: 50px;
      color: white;
    }
  }
`;

const PayButton = styled(Link)`
  margin: 10px 30px;
  padding: 0.4em 1em;
  line-height: 1;
  background-color: #3f15d6;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  text-decoration: none;
  transition-duration: 300ms;

  &:hover {
    transform: scale(1.2);
  }
`;

const Withdrawals = ({ user }: { user: User | null }) => {
  const { withdrawals, getClientWithdrawals } = useWithdrawals();
  const [pendingWithdrawals, setPendingWithdrawals] = useState({
    weight: 0,
    price: "",
  });
  const totalKgNumber = useRef<number>(0);

  const calculateTotalPending = useCallback(async () => {
    await withdrawals?.forEach((withdrawal) => {
      const { weight, paid } = withdrawal;
      if (!paid) {
        totalKgNumber.current += weight;
      }
    });
  }, [withdrawals]);

  useEffect(() => {
    if (user) {
      getClientWithdrawals(user.uid);
    }
  }, [getClientWithdrawals, user]);

  useEffect(() => {
    calculateTotalPending().then(() => {
      setPendingWithdrawals({
        weight: totalKgNumber.current,
        price: new Intl.NumberFormat("es-ES").format(
          totalKgNumber.current * 10000
        ),
      });
      totalKgNumber.current = 0;
    });
  }, [calculateTotalPending]);

  return (
    <Container>
      <h1>Retiros</h1>
      <PriceBar>
        <h4>
          Acumulado <span>{pendingWithdrawals.weight}Kg</span>
        </h4>
        <h4>
          Deuda <span>{pendingWithdrawals.price}CLP</span>
        </h4>
        <PayButton to="/panel/pay/withdrawals">PAGAR</PayButton>
      </PriceBar>
      <ListContainer>
        <ul>
          {withdrawals ? (
            withdrawals.map((info, index) => {
              return (
                <li key={index}>
                  <Card>
                    <Header>
                      <Date>{info.date.toDate().toDateString()}</Date>
                    </Header>
                    <Footer>
                      {info.paid ? (
                        <PayState>✅Pagado</PayState>
                      ) : (
                        <PayState>🛑Pendiente</PayState>
                      )}
                      <Weight>Peso {info.weight}kg</Weight>
                    </Footer>
                  </Card>
                </li>
              );
            })
          ) : (
            <h2>No hay Retiros Todavía</h2>
          )}
        </ul>
      </ListContainer>
    </Container>
  );
};

export default Withdrawals;
