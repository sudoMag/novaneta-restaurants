import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.section`
  display: flex;
  width: 100%;
  position: relative;
  height: 90vh;
  background-color: #3f15d6;
  overflow: hidden;
`;

const LeftContent = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 30px;
`;

const RightContent = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
`;

const WelcomeText = styled.h1`
  color: white;
  width: 40vw;
  font-weight: 900;
  font-size: 3em;

  & span {
    color: yellow;
  }
`;

const PhoneImg = styled.img`
  height: 40vh;
  align-self: flex-end;
`;

const RegisterRedirectButton = styled(Link)`
  padding: 0.8em 1em;
  background-color: white;
  border-radius: 10px;
  color: black;
  font-weight: 900;
  text-decoration: none;
`;

const Header = () => {
  return (
    <Container className="mobile-change orientation">
      <LeftContent className="mobile-change all-screen-width">
        <WelcomeText className="mobile-change fontsize small mediun-width">
          Gestiona el retiro de tus residuos especiales o peligrosos facilmente
          con <span>WASTE</span>
        </WelcomeText>
        <RegisterRedirectButton to="/login/register">
          EMPEZAR
        </RegisterRedirectButton>
      </LeftContent>
      <RightContent className="mobile-change all-screen-width">
        <PhoneImg src="./iphone.png" />
      </RightContent>
    </Container>
  );
};

export default Header;
