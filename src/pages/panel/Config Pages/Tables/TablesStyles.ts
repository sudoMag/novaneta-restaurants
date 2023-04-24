import styled from "styled-components";


export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
`;

export const TablesContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Icon = styled.img`
  width: 25px;
  height: 25px;
  padding: 5px;
  border-radius: 10px;
  background-color: var(--bg-main-color);
  margin: 0 10px;
`;

export const Table = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--bg-color);
  border: solid 1px #383838;
  width: 70%;
  border-radius: 10px;
  margin: 5px;
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  & span {
    background-color: #5f5f5f52;
    padding: 5px 10px;
    line-height: 1;
    border-radius: 10px;
    color: var(--bg-main-color);
    font-weight: bold;
    margin: 0 15px;
  }

  & h1 {
    margin: 15px 30px;
  }
`;

export const NewTableButton = styled.div`
  background-color: var(--bg-main-color);
  border: 1px solid #383838;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  margin: 15px 0;
  cursor: pointer;
  font-weight: bold;
  color: var(--font-color);
  text-decoration: none;
`;

export const NewTableInput = styled.input`
  padding: 10px 20px;
  margin: 10px 0;
  background-color: var(--bg-color);
  border-radius: 10px;
  border: 1px solid gray;
`;
