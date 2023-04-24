import styled, { css } from "styled-components";
import ScaleX from "../../../../../components/animations/ScaleX";
import Opacity from "../../../../../components/animations/Opacity";

const ActiveMode = css`
  background: #2f2f2fc2;
  padding: 10px 0;
`;

const ActiveButtons = css`
  padding: 10px 1em;
  border-radius: 15px;
  font-size: 1.1em;
`;

const SelectedCart = css`
  background-color: var(--bg-color);
  color: var(--bg-main-color);
  font-weight: bold;
`;

export const Container = styled.section<{ SelectMode: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  border-radius: 10px;
  transition-duration: 400ms;

  ${({ SelectMode }) => {
    if (SelectMode) {
      return ActiveMode;
    }
  }}

  & h1 {
    margin: 10px;
  }
`;

export const NewCartButton = styled.img`
  border-radius: 8px;
  padding: 10px 10px;
  background-color: var(--bg-main-color);
  background: var(--gradient-1);
  border: 1px solid #383838;
  margin: 10px 20px;
  cursor: pointer;
`;

export const ClientCartsContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ClientCartButton = styled.div<{ SelectMode: boolean; active?: boolean }>`
  height: 35px;
  border-radius: 8px;
  background-color: var(--bg-main-color);
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
`;

export const NewCartName = styled.input`
  height: 35px;
  min-width: 65px;
  border: none;
  text-align: center;
  background-color: transparent;
  color: white;
  opacity: 0;
  animation: ${Opacity} 300ms 500ms ease-in-out forwards;

  &:focus-visible {
    outline: none;
  }
`;
