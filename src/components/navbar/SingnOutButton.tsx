import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/configuration";
import buttonImg from "../../icons/exit.svg";

const Button = styled.img`
  display: block;
  text-align: center;
  padding: 0.8em 0.8em;
  cursor: pointer;
  transition-duration: 300ms;

  &:hover {
  }
`;

const SignOutButton = () => {
  return <Button onClick={() => signOut(auth)} src={buttonImg} />
}

export default SignOutButton;
