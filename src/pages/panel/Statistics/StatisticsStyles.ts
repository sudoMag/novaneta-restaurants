import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 20px;
  grid-template-rows: repeat(2, 1fr);
`;

export const SalesListContainer = styled.div`
  overflow-y: auto;
  background-color: var(--bg-color);
  padding: 20px;
  border-radius: 10px;
  grid-column: 3/ 3;
  grid-row: 1 / 1;

  &::-webkit-scrollbar {
    display: none;
  }

  &.infinite-scroll-component {
    &::-webkit-scrollbar {
      display: none;
    }
  }

  /* & li {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    background-color: #2a2a2a;
    border-radius: 10px;
    margin: 5px 0;
  } */
`;

export const SpaceLoading = styled.div`
  height: 10px;
`;

export const SalesOfDayContainer = styled.section`
  background-color: var(--bg-color);
  padding: 20px;
  border-radius: 10px;
  grid-column: 4/ 4;
  grid-row: 1 / 1;
`;

export const ExcelDownloadContainer = styled.section`
  background-color: var(--bg-color);
  padding: 20px;
  border-radius: 10px;
  grid-column: 1/ 1;
  grid-row: 2 / 2;
`;

export const CardLayoutTextContainer = styled.div`
  color: white;
`;

export const DownloadButton = styled.div`
  background-color: var(--bg-main-color);
  padding: 10px 20px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;
