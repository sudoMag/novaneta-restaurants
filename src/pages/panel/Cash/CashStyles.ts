import styled, { css } from "styled-components";
import { LeftContent, RightContent } from "../../../components/SplittedPanel";
import { isMobile } from "react-device-detect";
import Opacity from "../../../components/animations/Opacity";
import { ProfileColorPalette } from "../../../utils/types/ProfileColorPallete";

export const HeadBarLeft = styled.div`
  width: 100%;
  & #logo {
    margin: 10px 20px;
  }
`;

export const MobileLeftLayoutMode = css`
  width: 100%;
  height: 100%;
`;

export const CustomLeftLayout = styled(LeftContent)`
  ${isMobile ? MobileLeftLayoutMode : null}
`;

export const MobileRightLayoutMode = css`
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

export const CustomRightLayout = styled(RightContent)<{ showMenu: boolean }>`
  ${isMobile ? MobileRightLayoutMode : null}
  ${({ showMenu }) => (isMobile && showMenu ? showMenuInMobile : null)}
`;

export const HeadBarRight = styled.div`
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

export const ProfileCard = styled.div`
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

export const ProfilePicture = styled.img`
  height: 40px;
  border-radius: 30px;
  margin-right: 10px;
`;

export const LetterProfile = styled.div<{
  colorPalette: ProfileColorPalette;
  width?: number;
  height?: number;
}>`
  height: 40px;
  width: 40px;
  ${({ width }) => width && `width: ${width}px;`}
  ${({ height }) => height && `height: ${height}px;`}
  display: flex;
  border-radius: 30px;
  margin-right: 10px;
  background-color: #341c7c;
  color: #cfc5c5;
  ${({ colorPalette }) =>
    colorPalette &&
    css`
      background-color: ${colorPalette.bg};
    `}
  ${({ colorPalette }) =>
    colorPalette &&
    css`
      color: ${colorPalette.txt};
    `}
  align-items: center;
  justify-content: center;
  font-size: 1.4em;
  line-height: 1;
  font-weight: bold;
`;
