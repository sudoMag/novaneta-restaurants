import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { UserContext } from "../context/UserContext";
import LogoAnim from "../lotties/novanetalogoanim.json";
import PizzaSpinner from "../icons/pizza.svg";
import { DeviceContext } from "../context/DeviceContext";

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #a45b17;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled(Player)`
  animation-fill-mode: forwards;
`;

const RotateAnim = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.img`
  height: 50px;
  width: 50px;
  animation: ${RotateAnim} linear infinite 3s 0s;
`;
const SpinnerSpace = styled.div`
  height: 50px;
  width: 50px;
`;

const Loading = () => {
  const { user, userData } = useContext(UserContext);
  const { devices, nextDirect, thisDeviceInLocalStorage } =
    useContext(DeviceContext);
  const [nextReady, setNextReady] = useState({
    userReady: false,
    animReady: false,
    devicesReady: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined && nextReady.animReady) {
      navigate("/login");
    } else if (
      userData !== undefined &&
      user !== null &&
      !nextReady.userReady
    ) {
      setNextReady({ ...nextReady, userReady: true });
    }
  }, [userData, navigate, nextReady, user]);

  useEffect(() => {
    if (nextReady.animReady && nextReady.userReady && nextReady.devicesReady) {
      if (nextDirect && thisDeviceInLocalStorage) {
        navigate("/panel/cash/select");
      }

      if (!nextDirect) {
        navigate("/profiles");
      }
    }
  }, [nextReady, navigate, nextDirect, thisDeviceInLocalStorage]);

  useEffect(() => {
    if (!nextReady.animReady) {
      setTimeout(() => setNextReady({ ...nextReady, animReady: true }), 3000);
    }
  }, [nextReady]);

  useEffect(() => {
    if (devices.length !== 0 && !nextReady.devicesReady) {
      setNextReady({ ...nextReady, devicesReady: true });
    }
  }, [devices.length, nextReady]);

  return (
    <Container>
      <Logo src={LogoAnim} loop={false} keepLastFrame autoplay />
      {user ? <Spinner src={PizzaSpinner} /> : <SpinnerSpace />}
    </Container>
  );
};

export default Loading;
