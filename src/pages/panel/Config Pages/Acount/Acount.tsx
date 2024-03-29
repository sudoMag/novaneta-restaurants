import { Flex } from "@tremor/react";
import { useContext } from "react";
import { DeviceContext } from "../../../../context/DeviceContext";
import { Letter } from "../../../../utils/types/ProfileColorPallete";
import Device from "../../../../utils/types/Device";
import { Container, EditIconButton, ProfileName } from "./AcountStyles";
import ProfileFace from "../../../../components/ProfilePicture";
import EditIcon from "../../../../icons/edit.svg";
import { UserContext } from "../../../../context/UserContext";

const Acount = () => {
  const { thisDevice } = useContext(DeviceContext);
  const { userData } = useContext(UserContext);

  return (
    <Container>
      <Flex className="w-full items-center justify-center my-6">
        <h1 className="capitalize font-bold text-xl">
          {userData?.name}
        </h1>
      </Flex>
      <Flex className="w-full items-center justify-center my-6">
        <ProfileFace
          profile={thisDevice as Device<Letter[]>}
          size={{ width: 80, height: 80 }}
        />
        <div className="px-4">
          <ProfileName>{thisDevice?.name}</ProfileName>
          <p className="capitalize">{thisDevice?.role}</p>
        </div>
        <EditIconButton src={EditIcon} />
      </Flex>
    </Container>
  );
};

export default Acount;
