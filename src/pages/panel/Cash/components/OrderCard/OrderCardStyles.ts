import styled from "styled-components";
import Scale from "../../../../../components/animations/Scale";

export const Container = styled.div`
  margin: 10px 0;
  width: 90%;
  max-width: 600px;
  border-radius: 20px;
  border: solid 1px #383838;
  padding: 5px;
  background-color: #1d1e20;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  animation: ${Scale} 200ms ease-in-out;

  & h4 {
    margin: 5px;
  }
  flex-direction: column;
  align-items: center;
`;

export const ProgressBar = styled.div`
  width: 90%;
  height: 4px;
`;

export const Bar = styled.div<{ porcentage: number }>`
  width: 100%;
  ${({ porcentage }) => `width: ${porcentage}%`};
  height: 100%;
  background-color: var(--bg-main-color);
  background: var(--gradient-1);
  transition-duration: 400ms;
  transition-timing-function: ease-in-out;
  border-radius: 10px;
`;

export const CardContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const InfoContainer = styled.div`
  ul {
    padding: 0;
    gap: 10px;
    display: grid;
  }

  li {
    padding: 5px 10px;
    border-bottom: solid 1px #353535;
    gap: 5px 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-radius: 2px;
    justify-items: center;
    align-items: center;
  }

  li H4 {
    text-align: start;
    width: 100%;
  }

  span {
    background: var(--span-gradient);
    padding: 0.3em 0.6em;
    border-radius: 15px;
    animation: ihogNa 200ms ease-in-out;
    margin: 0 5px;
  }
`;

export const Total = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;

  & h4 {
    align-items: start;
  }
`;

export const HeadTitlesContainer = styled.header`
  padding: 5px 10px;
  border-bottom: solid 1px #353535;
  gap: 5px 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
`;
