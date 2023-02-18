import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Container = styled.footer`
  height: 200px;
  background-color: #121110;
  padding: 15px;
`;

const Logo = styled.div`
  width: 100px;
  margin: auto auto auto 40px;

  & span {
    color: #3f15d6;
  }

  & a {
    color: #6d6d6d;
    text-decoration: none;
  }
`;

const Footer = () => {
  return (
    <Container>
      <Logo>
        <NavLink to="/">
          <h2>
            <span>WASTE</span>
          </h2>
        </NavLink>
      </Logo>
    </Container>
  );
};

export default Footer;
