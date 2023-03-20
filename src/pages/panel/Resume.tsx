import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Cash from "./Cash";
import Pay from "./Pay";
import { PayContextProvider } from "../../context/PayContext";

const Container = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Resume = () => {
  return (
    <Container>
      <PayContextProvider>
        <Routes>
          <Route path="/select" element={<Cash />} />
          <Route path="/pay" element={<Pay />} />
        </Routes>
      </PayContextProvider>
    </Container>
  );
};

export default Resume;
