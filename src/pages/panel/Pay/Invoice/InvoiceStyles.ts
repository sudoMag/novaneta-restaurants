import styled from "styled-components";

export const InvoiceContainer = styled.div`
  width: 8cm;
  min-height: 8cm;
  background-color: white;
  justify-content: center;
  color: black;
  font-family: monospace;
  padding-bottom: 30px;

  & hr {
    width: 90%;
    border: 1px solid black;
    border-style: dashed;
  }
`;

export const InvoiceHeader = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & img {
    width: 60%;
  }
`;

export const InvoiceTitle = styled.h4`
  color: black;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const ItemsContainer = styled.div``;

export const Item = styled.div`
  color: black;
  display: grid;
  grid-template-columns: 2fr 0.5fr 0.5fr;
  gap: 10px;
  padding: 0 15px;
  justify-content: space-between;
  margin: 3px;
`;

export const ItemPrice = styled.div``;

export const TotalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 20px;
`;

export const InvoiceTotal = styled.h4`
  margin: 2px 0;
`;

export const DataUser = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;

  & h4 {
    margin: 2px 20px;
  }
`;
