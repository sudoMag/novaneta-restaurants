import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import CustomNavLink from "../../components/CustomNavLink";
import { LeftContent, RightContent } from "../../components/SplittedPanel";
import Logo from "../../icons/logowhite.svg";
import Appearance from "./Config Pages/Appearance";

const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;

  & ul {
    padding: 0;
  }

  & li {
    text-decoration: none;
    display: flex;
    justify-content: start;
    font-weight: bold;
    margin: 10px 0;
  }
`;

const ConfigNavigation = styled(LeftContent)`
  padding: 10px 20px;
  justify-content: start;
  width: 400px;
  align-items: start;

  & .active {
    color: #1d1e20;
    background-color: var(--bg-main-color);
    padding: 5px 15px;
    border-radius: 20px;
  }
`;

const CustomRightContent = styled(RightContent)``;

const Config = () => {
  return (
    <Container>
      <ConfigNavigation>
        <img id="logo" src={Logo} alt="logo novaneta" />
        <ul>
          <CustomNavLink to="theme">Apariencia</CustomNavLink>
          <CustomNavLink to="invoice">Factura</CustomNavLink>
          <CustomNavLink to="devices">Dispositivos</CustomNavLink>
          <CustomNavLink to="acount">Cuenta</CustomNavLink>
        </ul>
      </ConfigNavigation>
      <CustomRightContent>
        <Routes>
          <Route path="/theme" element={<Appearance />} />
          <Route path="/invoice" element={<h1>Factura</h1>} />
          <Route path="/devices" element={<h1>Dispositivos</h1>} />
          <Route path="/acount" element={<h1>Cuenta</h1>} />
        </Routes>
      </CustomRightContent>
    </Container>
  );
};

export default Config;
