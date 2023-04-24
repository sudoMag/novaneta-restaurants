import { useContext } from "react";
import ProfileImg from "../../../../components/ProfileImg";
import { DeviceContext } from "../../../../context/DeviceContext";
import { Card, CartsContainer, Container, NewProfileButton } from "./ProfileStyles";

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
