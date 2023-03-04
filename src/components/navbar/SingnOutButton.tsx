import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/configuration";
import buttonImg from "../../icons/exit.svg";
import { useNavigate } from "react-router-dom";

const Button = styled.img`
  display: block;
  text-align: center;
  cursor: pointer;
  transition-duration: 300ms;
  width: 38px;

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
