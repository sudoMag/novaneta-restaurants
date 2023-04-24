import { useContext, useState } from "react";
import CartsBar from "./components/CartsBar/CartsBar";
import CashBox from "./components/CashOrderProductsContainer/CashOrderProductsContainer";
import PayBar from "./components/PayBar/PayBar";
import ProductsSelectionBox from "./components/ProductsSelectionBox/ProductsSelectionBox";
import { UserContext } from "../../../context/UserContext";
import Logo from "../../../icons/logowhite.svg";
import DesktopIcon from "../../../icons/pcicon.svg";
import MobileIcon from "../../../icons/mobileicon.svg";
import { useNavigate } from "react-router-dom";
import { isDesktop, isMobile } from "react-device-detect";
import {
  CustomLeftLayout,
  CustomRightLayout,
  HeadBarLeft,
  HeadBarRight,
  ProfileCard,
} from "./CashStyles";
import ProfileFace from "../../../components/ProfilePicture";
import { DeviceContext } from "../../../context/DeviceContext";
import { Letter } from "../../../utils/types/ProfileColorPallete";
import Device from "../../../utils/types/Device";

const Cash = () => {
  const { thisDevice } = useContext(DeviceContext);
  const { userData } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

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
              <ProfileFace
                profile={{
                  ...(thisDevice as Device<Letter[]>),
                  name: thisDevice?.name.toLowerCase() as Letter[],
                }}
              />
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
