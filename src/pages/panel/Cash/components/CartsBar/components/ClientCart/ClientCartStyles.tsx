import styled, { css } from "styled-components";
import ScaleX from "../../../../../../../components/animations/ScaleX";

export const ActiveButtons = css`
  padding: 10px 1em;
  border-radius: 15px;
  font-size: 1.1em;
`;

export const SelectedCart = css`
  background: var(--bg-color);
  color: var(--bg-main-color);
  font-weight: bold;
`;

export const ClientCartPillName = styled.div<{
  SelectMode: boolean;
  active?: boolean;
}>`
  font-size: 1em;
  height: 35px;
  border-radius: 8px;
  background-color: var(--bg-main-color);
  background: var(--gradient-1);
  border: 1px solid #383838;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  line-height: 1;
  padding: 0 1em;
  transform: scaleX(0);
  white-space: nowrap;
  animation: ${ScaleX} 300ms ease-in-out forwards;
  transition-duration: 500ms;
  cursor: pointer;
  ${({ active }) => {
    return active ? SelectedCart : null;
  }}

  ${({ SelectMode }) => {
    if (SelectMode) {
      return ActiveButtons;
    }
  }}

  & #delete {
    display: none;
    width: 20px;
    height: 20px;
    padding: 5px;
    align-items: center;
    justify-content: center;
  }

  & #number {
    display: block;
  }

  &:hover #delete {
    display: flex;
    width: 25px;
    height: 25px;
    padding: 5px;

    & img {
      height: 25px;
      width: 25px;
      padding: 2px;
    }
  }

  &:hover #number {
    display: none;
  }
`;

export const NumberPill = styled.span`
  padding: 5px 8px;
  background-color: #414141a3;
  backdrop-filter: blur(5px);
  margin: 0 -25px 0 8px;
  border-radius: 30px;
`;
