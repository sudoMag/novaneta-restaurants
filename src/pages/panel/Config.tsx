import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import CustomNavLink from "../../components/CustomNavLink";
import { LeftContent, RightContent } from "../../components/SplittedPanel";
import Logo from "../../icons/logowhite.svg";
import Appearance from "./Config Pages/Appearance";
import Profiles from "./Config Pages/Profiles";
import Tables from "./Config Pages/Tables";

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

const CustomRightContent = styled(RightContent)`
  width: 100%;
  overflow: unset;
`;

const Config = () => {
  return (
    <Container>
      <ConfigNavigation>
        <img id="logo" src={Logo} alt="logo novaneta" />
        <ul>
          <CustomNavLink to="theme">Apariencia</CustomNavLink>
          <CustomNavLink to="tables">Mesas</CustomNavLink>
          <CustomNavLink to="invoice">Factura</CustomNavLink>
          <CustomNavLink to="profiles">Perfiles</CustomNavLink>
          <CustomNavLink to="acount">Cuenta</CustomNavLink>
        </ul>
      </ConfigNavigation>
      <CustomRightContent>
        <Routes>
          <Route path="/theme" element={<Appearance />} />
          <Route path="/invoice" element={<h1>Factura</h1>} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/acount" element={<h1>Cuenta</h1>} />
        </Routes>
      </CustomRightContent>
    </Container>
  );
};

export default Config;
