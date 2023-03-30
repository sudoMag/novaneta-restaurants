import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Cash from "./Cash";
import Pay from "./Pay";
import { isMobile } from "react-device-detect";

const Container = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;

  ${isMobile ? "flex-direction: column;" : null}
`;

const Resume = () => {
  return (
    <Container>
        <Routes>
          <Route path="/select" element={<Cash />} />
          <Route path="/pay" element={<Pay />} />
        </Routes>
    </Container>
  );
};

export default Resume;
