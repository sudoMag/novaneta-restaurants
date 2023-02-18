import styled from "styled-components";
import Logo from "../../icons/logowhite.svg";
import { LeftContent, RightContent } from "../../components/SplittedPanel";
import ProductsSelectionBox from "../../components/ProductsSelectionBox";

const Container = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Resume = () => {
  return (
    <Container>
      <LeftContent>
        <img src={Logo} alt="logo novaneta" />
        <h3>Caja</h3>
      </LeftContent>
      <RightContent>
        <h3>Productos</h3>
        <ProductsSelectionBox />
      </RightContent>
    </Container>
  );
};

export default Resume;
