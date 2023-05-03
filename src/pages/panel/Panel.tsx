import { NavLink, Route, Routes } from "react-router-dom";
import styled, { css } from "styled-components";
import { ProductsContext } from "../../context/ProductContext";
import Resume from "./Resume";
import SignOutButton from "../../components/navbar/SingnOutButton";
import NovanetaIcon from "../../icons/icon.svg";
import CashIcon from "../../icons/cash.svg";
import NewProductIcon from "../../icons/plus.svg";
import ConfigIcon from "../../icons/config.svg";
import NewProduct from "./NewProduct/NewProduct";
import Config from "./Config Pages/Config";
import { CashContextProvider } from "../../context/CashContext";
import Kitchen from "./Kitchen/Kitchen";
import KitchenIcon from "../../icons/kitchen.svg";
import StatisticsIcon from "../../icons/statistics.svg";
import { KitchenContextProvider } from "../../context/KitchenContext";
import { PayContextProvider } from "../../context/PayContext";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import StatisticsPage from "./Statistics/StatisticsPage";

const Container = styled.section`
  display: flex;
  height: 100vh;

  ${isMobile ? "flex-direction: column;" : null}
`;

const MobileNav = css`
  flex-direction: row;
  width: 100%;
  height: 60px;
  justify-content: center;

  & ul {
    flex-direction: row;
    margin: 0;
  }

  & li {
    margin: 10px;
  }
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

  ${isMobile ? MobileNav : null}
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

  ${isMobile ? "height: 100%;" : null}
`;

const NavSignOutButton = styled(SignOutButton)`
  margin: 5px 0;
`;

const MobileOptionsContainer = css`
  flex-direction: row;
  justify-content: center;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${isMobile ? MobileOptionsContainer : null}
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
        <BrowserView>
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
                <li>
                  <RouteLink to="./statistics">
                    <img src={StatisticsIcon} alt="statistics" />
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
        </BrowserView>
        <RightContainer>
          <CashContextProvider>
            <KitchenContextProvider>
              <PayContextProvider>
                <Routes>
                  <Route path="/cash/*" element={<Resume />} />
                  <Route path="kitchen" element={<Kitchen />} />
                  <Route path="new" element={<NewProduct />} />
                  <Route path="statistics" element={<StatisticsPage />} />
                  <Route path="config/*" element={<Config />} />
                </Routes>
              </PayContextProvider>
            </KitchenContextProvider>
          </CashContextProvider>
        </RightContainer>
      </ProductsContext>
      <MobileView>
        <Navigation>
          <ul>
            <OptionsContainer>
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
              <li>
                <RouteLink to="./statistics">
                  <img src={StatisticsIcon} alt="statistics" />
                </RouteLink>
              </li>
              <li>
                <RouteLink to="./config/theme">
                  <ConfigButton src={ConfigIcon} alt="config" />
                </RouteLink>
              </li>
            </OptionsContainer>
          </ul>
        </Navigation>
      </MobileView>
    </Container>
  );
};

export default Panel;
