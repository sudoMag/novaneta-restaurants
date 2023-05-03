import { useContext, useEffect, useState, ChangeEvent } from "react";
import styled, { css } from "styled-components";
import { DeviceContext } from "../context/DeviceContext";
import { isDesktop, isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import DesktopIcon from "../icons/pcicon.svg";
import MobileIcon from "../icons/mobileicon.svg";
import OpacityAndTranslate from "../components/animations/OpacityAndTranslate";
import Opacity from "../components/animations/Opacity";
import ScaleZoom from "../components/animations/ScaleZoom";
import Device from "../utils/types/Device";
import { Letter } from "../utils/types/ProfileColorPallete";
import ProfileFace from "../components/ProfilePicture";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DevicesContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: row;
`;

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

const zoomAnimation = css`
  animation: ${ScaleZoom} 400ms ease-in-out forwards;
`;

const ProfileCard = styled.div<{ number: number; animate: boolean }>`
  margin: 5px;
  border-radius: 20px;
  width: 300px;
  background-color: #1d1e20;
  border: 1px solid #383838;
  text-align: center;
  color: #747474;
  font-weight: bold;
  line-height: 1;
  padding: 25px 0;
  cursor: pointer;
  animation: ${OpacityAndTranslate} 300ms ease-in-out
    ${({ number }) => number}5ms forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ animate }) => (animate ? zoomAnimation : null)}

  & #profile-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 10px 0;
  }
`;

const RolePill = styled.div`
  background-color: #712652;
  padding: 5px 10px;
  border-radius: 10px;
  box-shadow: 0px 1px 30px #e40064;
  margin: 20px 0;
`;

const Devices = ({ profiles }: { profiles: boolean }) => {
  const {
    devices,
    thisDevice,
    setDeviceInLocalStorage,
    newDevice,
    nextDirect,
  } = useContext(DeviceContext);
  const [selector, setSelector] = useState("Desktop");
  const [role, setRole] = useState("basic");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [animeteProfile, setAnimateProfile] = useState(false);

  const onNextHandler = () => {
    newDevice({
      id: "",
      name: name,
      deviceType: selector,
      role: role,
      profileImg: "default",
    });
  };

  const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const clickProfileHandler = (device: Device<string>) => {
    setDeviceInLocalStorage(device);
    setAnimateProfile(true);
    setTimeout(() => {
      navigate("/panel/cash/select");
    }, 300);
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
      {profiles ? (
        <DevicesContainer>
          {devices.map((device, index) => {
            return (
              <ProfileCard
                key={index}
                number={index}
                animate={animeteProfile}
                onClick={() => clickProfileHandler(device)}
              >
                <RolePill>{device.role}</RolePill>
                <ProfileFace
                  profile={{
                    ...(device as unknown as Device<Letter[]>),
                    name: device?.name.toLowerCase() as unknown as Letter[],
                  }}
                  id="profile-img"
                />
                <h2>{device.name}</h2>
              </ProfileCard>
            );
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
              placeholder="Nombre y Apellido del perfil"
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
