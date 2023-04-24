import styled, { css } from "styled-components";

export const SendToKitchenButton = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: var(--bg-main-color);
  color: #1d1e20;
  font-weight: bold;
  cursor: pointer;
  margin: 10px;
`;

export const PayButton = styled.div`
  padding: 10px;
  border-radius: 10px;
  background: var(--gradient-1);
  color: #1d1e20;
  font-weight: bold;
  cursor: pointer;
  margin: 10px;
`;

export const TypeActive = css`
  background-color: var(--bg-main-color);
  color: #1d1e20;
`;

export const PayType = styled.div<{ active: boolean }>`
  padding: 10px;
  border-radius: 10px;
  background-color: var(--bg-color);
  color: var(--bg-main-color);
  font-weight: bold;
  cursor: pointer;
  margin: 10px;
  ${({ active }) => (active ? TypeActive : null)}
`;

export const PayTypeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DisableButton = styled.div`
  padding: 10px;
  background-color: #414141;
  border-radius: 10px;
  margin: 10px;
  font-weight: bold;
  color: #1d1e20;
`;

export const InputBar = styled.input`
  margin: 5px;
  border-radius: 10px;
  max-width: 300px;
  height: 30px;
  background-color: #9fa2a7;
  text-align: center;
  border: none;
  color: var(--bg-color);
  font-weight: bold;
  font-family: system-ui;
  border: 2px solid transparent;

  &::placeholder {
    color: var(--bg-color);
    font-weight: bold;
  }

  &:focus-visible {
    border: 2px solid #747474;
    outline: none;
  }
`;

export const SendButton = styled.div`
  padding: 10px 0;
  border-radius: 10px;
  background-color: var(--bg-main-color);
  color: #1d1e20;
  font-weight: bold;
  cursor: pointer;
  margin: 10px;
  width: 180px;
  justify-content: center;
  display: flex; ;
`;
