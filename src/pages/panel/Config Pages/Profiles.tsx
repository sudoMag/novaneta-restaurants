import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import OpacityAndTranslate from "../../../components/animations/OpacityAndTranslate";
import ProfileImg from "../../../components/ProfileImg";
import { DeviceContext } from "../../../context/DeviceContext";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
`;

const CartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.div`
  background-color: var(--bg-color);
  margin: 10px 0;
  border: 1px solid #383838;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 90%;
  min-height: 80px;
  border-radius: 40px;
  opacity: 0;
  animation: ${OpacityAndTranslate} 300ms ease-in-out forwards;

  & img {
    margin: 10px;
  }

  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 20px;
  }

  & span {
    background-color: #712652;
    padding: 5px 10px;
    border-radius: 10px;
    box-shadow: 0px 1px 30px #e40064;
    margin: 0 20px;
    line-height: 1;
  }

  & h2 {
    line-height: 1;
  }
`;

const NewProfileButton = styled(Link)`
  background-color: var(--bg-main-color);
  border: 1px solid #383838;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  margin: 15px 0;
  cursor: pointer;
  font-weight: bold;
  color: var(--font-color);
  text-decoration: none;
`;

const Profiles = () => {
  const { devices } = useContext(DeviceContext);

  return (
    <Container>
      <h1>Perfiles</h1>
      <CartsContainer>
        {devices.map((device, index) => {
          return (
            <Card key={index}>
              <ProfileImg imgUrl={device.profileImg} role={device.role} />
              <div>
                <h2>{device.name}</h2>
                <span>{device.role}</span>
              </div>
            </Card>
          );
        })}
      </CartsContainer>
      <NewProfileButton to="/new-profile">Crear nuevo perfil</NewProfileButton>
    </Container>
  );
};

export default Profiles;
