import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const Img = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  margin-right: 10px;
`;

const ProfileImg = ({imgUrl, role}: {imgUrl: string, role: string}) => {
  const [picture, setPicture] = useState("");

  const profilePicture = useCallback(() => {
    if (imgUrl === "default") {
      if (role === "admin") {
        setPicture("/otter-admin-profile.png");
      } else {
        setPicture("/water-profile.png");
      }
    } else {
      setPicture(imgUrl);
    }
  }, [imgUrl, role]);

  useEffect(() => {
    profilePicture()
  }, [profilePicture])

  return <Img src={picture}/>
}

export default ProfileImg;
