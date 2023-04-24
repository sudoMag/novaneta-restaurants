import { useContext } from "react";
import MiniLayout from "../../../../components/MiniLayout";
import { ThemeContext } from "../../../../context/ThemeContext";
import { Container } from "../Profiles/ProfileStyles";
import { SelectColorCircle, SelectorsContainer } from "./AppearanceStyles";

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
