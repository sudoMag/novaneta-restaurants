import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Button = styled(NavLink)`
  display: block;
  margin:  0 5px;
  text-align: center;
  font-weight: bold;
  background-color: transparent;
  color: black;
  border: solid 3px #000000;
  padding: 0.8em 0.8em;
  line-height: 1;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 2px 2px 5px #00000036;
  transition-duration: 200ms;

  &:hover {
    background-color: #3f15d6;
    color: white;
  }
`;

const LoginButton = () => {
  return <Button to="login">Ingresar</Button>
}

export default LoginButton;
