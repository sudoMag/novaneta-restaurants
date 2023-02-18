import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../context/ProductContext";
import ProductCard from "./productCard";

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 30px;
`;

const Title = styled.h1`
  color: white;
  margin: 1em 50px 0 50px;
`;

const ProductsCompilation = () => {
  //const { products } = useContext(Context);

  return (
    <>
      <Title>Productos 🛒</Title>
      <Container className="mobile-change center-content">
      {/* {products.map((product, id) => {
        return <ProductCard key={id} cardData={product} />;
      })} */}
    </Container>
    </>
  );
};

export default ProductsCompilation;
