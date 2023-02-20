import { useContext, useEffect } from "react";
import styled from "styled-components";
import { CashContext } from "../context/CashContext";
import { Context } from "../context/ProductContext";
import useCurrencyFormat from "../hooks/useCurrencyFormat";

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  padding: 5px;
  justify-content: center;
`;

const ProductCard = styled.div`
  width: 120px;
  height: 155px;
  background-color: #444048;
  border: solid 1px gray;
  border-radius: 30px;
  margin: 5px;
  font-size: 0.9em;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  & h4 {
    margin: 0.4em 0;
    height: 3em;
    overflow: hidden;
    padding: 0 10px;
    line-height: 1.1em;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 60%;
  background: linear-gradient(
    90deg,
    rgba(98, 62, 7, 1) 0%,
    rgba(115, 42, 81, 1) 100%
  );
`;

const PricePill = styled.div`
  padding: 0.2em 0.5em;
  border-radius: 10px;
  border: solid 1px gray;
  background-color: #2727286b;
  text-align: end;
  color: white;
  margin-top: -1.9em;
`;

const ProductsSelectionBox = () => {
  const { Products, onChangeProducts } = useContext(Context);
  const {addToCart} = useContext(CashContext)
  const { formatCurrency } = useCurrencyFormat()

  useEffect(() => {
    const unSubscribe = onChangeProducts();
    return unSubscribe;
  }, [onChangeProducts]);

  return (
    <Container>
      {Products.length !== 0
        ? Products.map((product) => {
            return (
              <ProductCard key={product.id} onClick={() => addToCart(product)}>
                <ImgContainer />
                <PricePill>$ {formatCurrency( "CLP", product.price)}</PricePill>
                <h4>{product.name}</h4>
              </ProductCard>
            );
          })
        : "cargando..."}
    </Container>
  );
};

export default ProductsSelectionBox;
