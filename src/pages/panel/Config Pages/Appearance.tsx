import { useContext } from "react";
import styled from "styled-components";
import MiniLayout from "../../../components/MiniLayout";
import { ThemeContext } from "../../../context/ThemeContext";

const Container = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  padding: 20px 20px;
`;

const SelectColorCircle = styled.section`
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

const SelectorsContainer = styled.div`
  display: flex;
`;

const Appearance = () => {
  const { selectTheme } = useContext(ThemeContext);

  return (
    <Container>
      <MiniLayout />
      <h1>Apariencia</h1>
      <SelectorsContainer>
        <SelectColorCircle
          style={{ backgroundColor: "#a45b17" }}
          onClick={() => selectTheme("novaneta")}
        />
        <SelectColorCircle
          style={{ backgroundColor: "#360aaf" }}
          onClick={() => selectTheme("blue")}
        />
        <SelectColorCircle
          style={{ backgroundColor: "#8d053e" }}
          onClick={() => selectTheme("pink")}
        />
        <SelectColorCircle
          style={{ backgroundColor: "#05641d" }}
          onClick={() => selectTheme("green")}
        />
      </SelectorsContainer>
    </Container>
  );
};

export default Appearance;
