import { useContext, useEffect } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProductsContext } from "../../context/ProductContext";
import { UserContext } from "../../context/UserContext";
import Resume from "./Resume";
import SignOutButton from "../../components/navbar/SingnOutButton";
import NovanetaIcon from "../../icons/icon.svg";
import CashIcon from "../../icons/cash.svg";
import NewProductIcon from "../../icons/plus.svg"
import NewProduct from "./NewProduct";

const Container = styled.section`
  display: flex;
  height: 100vh;
`;

const Navigation = styled.nav`
  width: 60px;
  background-color: #a45b17;
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
  bottom: 10px;
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

const Panel = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Container>
      <ProductsContext>
        <Navigation>
          <ul>
            <OptionsContainer>
              <NovanetaIconImg src={NovanetaIcon} alt="novaneta logo"/>
              <li>
                <RouteLink to="./cash">
                  <img src={CashIcon} alt="cajero" />
                </RouteLink>
              </li>
              <li>
                <RouteLink to="./new">
                  <img src={NewProductIcon} alt="new" />
                </RouteLink>
              </li>
            </OptionsContainer>
            <NavSignOutButton />
          </ul>
        </Navigation>
        <RightContainer>
          <Routes>
            <Route path="/cash" element={<Resume />} />
            <Route path="new" element={<NewProduct />} />
          </Routes>
        </RightContainer>
      </ProductsContext>
    </Container>
  );
};

export default Panel;
