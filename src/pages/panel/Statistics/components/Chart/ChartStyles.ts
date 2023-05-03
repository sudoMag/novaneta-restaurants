import styled from "styled-components";

export const Container = styled.section`
  overflow-y: auto;
  background-color: var(--bg-color);
  /* padding: 20px; */
  border-radius: 10px;
  grid-column: 1 / 3;
  grid-row: 1 / 1;

  & .tremor-Card-root {
    background-color: transparent;
    --tw-ring-opacity: 0;
    box-shadow: none;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
