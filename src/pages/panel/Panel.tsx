import { NavLink, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { ProductsContext } from "../../context/ProductContext";
import Resume from "./Resume";
import SignOutButton from "../../components/navbar/SingnOutButton";
import NovanetaIcon from "../../icons/icon.svg";
import CashIcon from "../../icons/cash.svg";
import NewProductIcon from "../../icons/plus.svg";
import ConfigIcon from "../../icons/config.svg";
import NewProduct from "./NewProduct";
import Config from "./Config";
import { CashContextProvider } from "../../context/CashContext";
import Kitchen from "./Kitchen";
import KitchenIcon from "../../icons/kitchen.svg";
import { KitchenContextProvider } from "../../context/KitchenContext";

const Container = styled.section`
  display: flex;
  height: 100vh;
`;

const Navigation = styled.nav`
  width: 60px;
  background-color: var(--bg-main-color);
  height: 100%;
  display: flex;
  flex-direction: column;

  & ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    justify-content: space-between;
    height: 100%;
  }

  & li {
    text-decoration: none;
    display: flex;
    justify-content: center;
    font-weight: bold;
    margin: 5px;
  }
`;

const RouteLink = styled(NavLink)`
  color: black;
  text-decoration: none;

  & span {
    display: none;
    display: none;
    position: fixed;
    transform: translateX(-25px);
  }

  &:hover {
    & span {
      display: block;
    }
  }
`;

const RightContainer = styled.main`
  display: flex;
  width: 100%;
  justify-content: center;
  overflow: hidden;

  & h1 {
    margin: 30px;
  }
`;

const NavSignOutButton = styled(SignOutButton)`
  margin: 5px 0;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NovanetaIconImg = styled.img`
  width: 70%;
  margin: 10px 0;
`;

const BottonOptionsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
`;

const ConfigButton = styled.img`
  margin: 10px 0;
`;

const Panel = () => {
  return (
    <Container>
      <ProductsContext>
        <Navigation>
          <ul>
            <OptionsContainer>
              <NovanetaIconImg src={NovanetaIcon} alt="novaneta logo" />
              <li>
                <RouteLink to="./cash/select">
                  <img src={CashIcon} alt="cajero" />
                </RouteLink>
              </li>
              <li>
                <RouteLink to="./kitchen">
                  <img src={KitchenIcon} alt="cocina" />
                </RouteLink>
              </li>
              <li>
                <RouteLink to="./new">
                  <img src={NewProductIcon} alt="new" />
                </RouteLink>
              </li>
            </OptionsContainer>
            <BottonOptionsContainer>
              <li>
                <RouteLink to="./config/theme">
                  <ConfigButton src={ConfigIcon} alt="config" />
                </RouteLink>
              </li>
              <NavSignOutButton />
            </BottonOptionsContainer>
          </ul>
        </Navigation>
        <RightContainer>
          <CashContextProvider>
            <KitchenContextProvider>
              <Routes>
                <Route path="/cash/*" element={<Resume />} />
                <Route path="kitchen" element={<Kitchen />} />
                <Route path="new" element={<NewProduct />} />
                <Route path="config/*" element={<Config />} />
              </Routes>
            </KitchenContextProvider>
          </CashContextProvider>
        </RightContainer>
      </ProductsContext>
    </Container>
  );
};

export default Panel;
