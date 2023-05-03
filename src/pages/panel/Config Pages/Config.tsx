import { Route, Routes } from "react-router-dom";
import CustomNavLink from "../../../components/CustomNavLink";
import Logo from "../../../icons/logowhite.svg";
import Appearance from "./Appearance/Appearance";
import Profiles from "./Profiles/Profiles";
import Tables from "./Tables/Tables";
import { ConfigNavigation, Container, CustomRightContent } from "./ConfigStyles";
import Acount from "./Acount/Acount";

const Config = () => {
  return (
    <Container>
      <ConfigNavigation>
        <img id="logo" src={Logo} alt="logo novaneta" />
        <ul>
          <CustomNavLink to="theme">Apariencia</CustomNavLink>
          <CustomNavLink to="tables">Mesas</CustomNavLink>
          {/* <CustomNavLink to="invoice">Factura</CustomNavLink> */}
          <CustomNavLink to="profiles">Perfiles</CustomNavLink>
          <CustomNavLink to="acount">Cuenta</CustomNavLink>
        </ul>
      </ConfigNavigation>
      <CustomRightContent>
        <Routes>
          <Route path="/theme" element={<Appearance />} />
          {/* <Route path="/invoice" element={<h1>Factura</h1>} /> */}
          <Route path="/tables" element={<Tables />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/acount" element={<Acount />} />
        </Routes>
      </CustomRightContent>
    </Container>
  );
};

export default Config;
