import styled from "styled-components";
import { LeftContent, RightContent } from "../../../components/SplittedPanel";

export const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;

  & ul {
    padding: 0;
  }

  & li {
    text-decoration: none;
    display: flex;
    justify-content: start;
    font-weight: bold;
    margin: 10px 0;
  }
`;

export const ConfigNavigation = styled(LeftContent)`
  padding: 10px 20px;
  justify-content: start;
  width: 400px;
  align-items: start;

  & .active {
    color: #1d1e20;
    background-color: var(--bg-main-color);
    padding: 5px 15px;
    border-radius: 20px;
  }
`;

export const CustomRightContent = styled(RightContent)`
  width: 100%;
  overflow: unset;
`;
