import { useContext, useEffect, useState, ChangeEvent } from "react";
import styled from "styled-components";
import { DeviceContext } from "../context/DeviceContext";
import { isDesktop, isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import DesktopIcon from "../icons/pcicon.svg";
import MobileIcon from "../icons/mobileicon.svg";
import OpacityAndTranslate from "../components/animations/OpacityAndTranslate";
import Opacity from "../components/animations/Opacity";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DevicesContainer = styled.div``;

const Input = styled.input`
  margin: 5px;
  border-radius: 10px;
  width: 300px;
  height: 30px;
  background-color: #112030;
  border: 1px solid #383838;
  text-align: center;
  color: #747474;
  font-weight: bold;
  font-family: system-ui;

  &::placeholder {
    color: #747474;
    font-weight: bold;
  }

  &:focus-visible {
    border: 2px solid #747474;
    outline: none;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  max-width: 500px;
  align-self: center;
  margin: 50px 0 0 0;
  animation: ${Opacity} 300ms 200ms ease-in-out forwards;

  & h3 {
    color: var(--font-color);
  }

  & h5 {
    margin: 2px;
  }

  & span {
    padding: 10px 15px;
    background-color: #a1173a;
    border-radius: 10px;
    line-height: 1;
    margin: 15px;
    border: 2px solid #c33659;
  }
`;

const DeviceSelector = styled.div`
  display: flex;
`;

const DeviceOptions = styled.img<{ autoSelectDevice: boolean }>`
  width: 50px;
  height: 50px;
  padding: 40px;
  background-color: #112030;
  border: 1px solid #383838;
  border-radius: 20px;
  margin: 0 20px;
  animation: ${OpacityAndTranslate} 300ms ease-in-out forwards;

  ${({ autoSelectDevice }) =>
    autoSelectDevice ? "background-color: #26588f;" : null}
`;

const NextButton = styled.div`
  margin: 5px;
  border-radius: 10px;
  width: 300px;
  background-color: #0e3258;
  border: 1px solid #383838;
  text-align: center;
  color: #747474;
  font-weight: bold;
  line-height: 1;
  padding: 10px 0;
  cursor: pointer;
  transition-duration: 300ms;

  &:hover {
    border: 2px solid #747474;
    background-color: #103d6d;
  }
`;

const Devices = () => {
  const { devices, thisDevice, setDevice, nextDirect } =
    useContext(DeviceContext);
  const [selector, setSelector] = useState("Desktop");
  const [role, setRole] = useState("basic");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const onNextHandler = () => {
    setDevice({
      name: name,
      deviceType: selector,
      role: role,
    });
    navigate("/");
  };

  const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (isDesktop) {
      setSelector("desktop");
    }
    if (isMobile) {
      setSelector("mobile");
    }
  }, []);

  useEffect(() => {
    if (devices.length === 0) {
      setRole("admin");
    }
  }, [devices]);

  useEffect(() => {
    if (thisDevice && nextDirect) {
      navigate("/panel/cash/select");
    }
  }, [nextDirect, navigate, thisDevice]);

  return (
    <Container>
      {thisDevice ? (
        <DevicesContainer>
          {devices.map((device) => {
            return <h2>{device.name}</h2>;
          })}
        </DevicesContainer>
      ) : (
        <>
          <h1>Crear Perfil</h1>
          <DeviceSelector>
            <DeviceOptions autoSelectDevice={isDesktop} src={DesktopIcon} />
            <DeviceOptions autoSelectDevice={isMobile} src={MobileIcon} />
          </DeviceSelector>
          <Form>
            {devices.length === 0 ? <span>Admin</span> : null}
            <Input
              placeholder="Nombre y Apellido del cajero"
              value={name}
              onChange={nameHandler}
            ></Input>
            <NextButton onClick={onNextHandler}>Next</NextButton>
          </Form>
        </>
      )}
    </Container>
  );
};

export default Devices;
