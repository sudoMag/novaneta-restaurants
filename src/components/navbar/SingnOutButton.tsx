import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/configuration";
import buttonImg from "../../icons/exit.svg";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()
  const SignOutAndGoToRootPage = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  return (
    <Button
      onClick={() => {
        SignOutAndGoToRootPage();
      }}
      src={buttonImg}
    />
  );
};

export default SignOutButton;
