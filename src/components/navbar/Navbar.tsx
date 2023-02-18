import styled from "styled-components";
import { useContext } from "react";
import MenuIcon from "../media/icons/MenuIcon";
import NavOptions from "./NavOptions";
import useVisibility from "../../hooks/useVisibility";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import LoginButton from "../LoginButton";
import SignOutButton from "./SingnOutButton";

const Bar = styled.nav`
  width: 100%;
  height: 80px;
  background-color: white;
  display: flex;
  position: sticky;
  top: 0px;
  z-index: 4;
  justify-content: space-between;
  box-shadow: -2px 4px 5px 0px #00000024;
`;

const Logo = styled.div`
  width: 100px;
  margin: auto auto auto 40px;

  & span {
    color: #3f15d6;
  }

  & a {
    color: #a0a0a0;
    text-decoration: none;
  }
`;

const LiveButton = styled(NavLink)`
  display: block;
  text-align: center;
  font-weight: bold;
  color: white;
  text-decoration: none;
  background-color: #3f15d6;
  padding: 0.8em 0.8em;
  line-height: 1;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 2px 2px 5px #00000036;
  margin: 0 10px;

  &:hover {
  }
`;

const OptionsButton = styled.button`
  margin: auto 50px auto auto;
  cursor: pointer;
  display: none;
  background-color: #3f15d6;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 10px;
  line-height: 1;

  & svg {
    margin: calc(50% - 32px / 2);
    fill: white;
  }
`;

const Navbar = () => {
  const { show, toggleVisibility } = useVisibility(false);
  const { user } = useContext(UserContext);

  return (
    <>
      <Bar>
        <Logo>
          <NavLink to="/">
            <h2>
              <span>WASTE</span>
            </h2>
          </NavLink>
        </Logo>
        <NavOptions
          show={show}
          onClick={() => {
            toggleVisibility();
          }}
        >
          <li>
            <NavLink to="keyboards">Planes</NavLink>
          </li>
          <li>Sobre Nosotros</li>
          <li>Contacto</li>
          {user ? (
            <>
              <LiveButton to="panel/resumen">PANEL</LiveButton>
              <SignOutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </NavOptions>
        <OptionsButton
          className="mobile-change show-item"
          onClick={() => {
            toggleVisibility();
          }}
        >
          <MenuIcon />
        </OptionsButton>
      </Bar>
    </>
  );
};

export default Navbar;
