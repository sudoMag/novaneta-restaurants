import { isMobile } from "react-device-detect";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;

  & h1 {
    margin: 10px;
    white-space: nowrap;
    ${isMobile
      ? css`
          width: 100%;
          text-align: center;
        `
      : null}
  }

  & span {
    font-size: 1.6em;
    ${isMobile ? "font-size: 1.3em;" : null}
  }
`;

export const PayButton = styled(NavLink)`
  padding: 10px;
  background-color: var(--bg-main-color);
  border-radius: 10px;
  margin: 10px;
  font-weight: bold;
  color: #1d1e20;
  cursor: pointer;
  text-decoration: none;
`;

export const DisableButton = styled.div`
  padding: 10px;
  background-color: #414141;
  border-radius: 10px;
  margin: 10px;
  font-weight: bold;
  color: #1d1e20;
`;

export const ToSomeBodyButton = styled.div`
  padding: 10px;
  background-color: var(--bg-main-color);
  border-radius: 10px;
  margin: 10px;
  font-weight: bold;
  color: #1d1e20;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
`;

export const OthersContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
