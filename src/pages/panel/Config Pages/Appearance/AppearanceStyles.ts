import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  padding: 20px 20px;
`;

export const SelectColorCircle = styled.section`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin: 0 10px;
  border: solid 1px #383838;
  cursor: pointer;

  &:hover {
    transform: scale(1.4);
    transition: 300ms ease-in-out;
  }
`;

export const SelectorsContainer = styled.div`
  display: flex;
`;
