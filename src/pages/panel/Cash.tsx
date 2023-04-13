import { useCallback, useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import CartsBar from "../../components/CartsBar";
import CashBox from "../../components/CashBox";
import PayBar from "../../components/PayBar";
import ProductsSelectionBox from "../../components/ProductsSelectionBox";
import { LeftContent, RightContent } from "../../components/SplittedPanel";
import { DeviceContext } from "../../context/DeviceContext";
import { UserContext } from "../../context/UserContext";
import Logo from "../../icons/logowhite.svg";
import DesktopIcon from "../../icons/pcicon.svg";
import MobileIcon from "../../icons/mobileicon.svg";
import Opacity from "../../components/animations/Opacity";
import { useNavigate } from "react-router-dom";
import { isDesktop, isMobile } from "react-device-detect";

const HeadBarLeft = styled.div`
  width: 100%;
  & #logo {
    margin: 10px 20px;
  }
`;

const MobileLeftLayoutMode = css`
  width: 100%;
  height: 100%;
`;

const CustomLeftLayout = styled(LeftContent)`
  ${isMobile ? MobileLeftLayoutMode : null}
`;

const MobileRightLayoutMode = css`
  width: 100%;
  height: 10%;
  background-color: #80808021;
  border-radius: 15px;
`;

const showMenuInMobile = css`
  height: 80%;

  & h3 {
    margin: 10px;
  }
`;

const CustomRightLayout = styled(RightContent)<{ showMenu: boolean }>`
  ${isMobile ? MobileRightLayoutMode : null}
  ${({ showMenu }) => (isMobile && showMenu ? showMenuInMobile : null)}
`;

const HeadBarRight = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  line-height: 1;
  padding: 10px;
  opacity: 0;
  align-items: center;
  animation: ${Opacity} 300ms ease-in-out forwards;

  & h3 {
    margin: 10px 20px;
  }
`;

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1;
  margin: 0 10px;
  background: var(--bg-color);
  border: 1px solid #383838;
  padding: 8px 10px;
  border-radius: 10px;
  cursor: pointer;

  & img {
    margin-right: 10px;
    height: 25px;
  }
`;

const ProfilePicture = styled.img`
  height: 40px;
  border-radius: 30px;
  margin-right: 10px;
`;

const Cash = () => {
  const { userData } = useContext(UserContext);
  const { thisDevice } = useContext(DeviceContext);
  const [showMenu, setShowMenu] = useState(false);
  const [picture, setPicture] = useState("");
  const navigate = useNavigate();

  const profilePicture = useCallback(() => {
    if (thisDevice) {
      if (thisDevice.profileImg === "default") {
        if (thisDevice.role === "admin") {
          setPicture("/otter-admin-profile.png");
        } else {
          setPicture("/water-profile.png");
        }
      } else {
        setPicture(thisDevice.profileImg);
      }
    }
  }, [thisDevice]);

  useEffect(() => {
    profilePicture();
  }, [profilePicture]);

  return (
    <>
      <CustomLeftLayout>
        <HeadBarLeft>
          <img id="logo" src={Logo} alt="logo novaneta" />
        </HeadBarLeft>
        <CartsBar />
        <CashBox />
        <PayBar />
      </CustomLeftLayout>
      <CustomRightLayout showMenu={showMenu}>
        {isDesktop ? (
          <>
            <HeadBarRight>
              <ProfileCard onClick={() => navigate("/profiles")}>
                {thisDevice?.deviceType === "desktop" ? (
                  <img src={DesktopIcon} alt="device" />
                ) : (
                  <img src={MobileIcon} alt="device" />
                )}
                {thisDevice?.name}
              </ProfileCard>
              <h3>{userData?.name}</h3>
              <ProfilePicture src={picture} />
            </HeadBarRight>
            <h3>Productos</h3>
          </>
        ) : null}
        {isMobile ? (
          <>
            <h3 onClick={() => setShowMenu(!showMenu)}>Productos</h3>
            {showMenu ? <ProductsSelectionBox /> : null}
          </>
        ) : (
          <ProductsSelectionBox />
        )}
      </CustomRightLayout>
    </>
  );
};

export default Cash;
