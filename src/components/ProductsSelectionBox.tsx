import { useContext, useEffect } from "react";
import styled from "styled-components";
import { CashContext } from "../context/CashContext";
import { Context } from "../context/ProductContext";
import Opacity from "./animations/Opacity";
import pizaSpinner from "../icons/pizzalight.svg";
import SpinnerRotation from "./animations/SpinnerRotation";
import InfiniteScroll from "react-infinite-scroll-component";
import { NumericFormat } from "react-number-format";

const Container = styled.section`
  display: flex;
  flex-direction: row;
  overflow-y: scroll;
  justify-content: center;
  height: 100%;

  &::-webkit-scrollbar {
    display: none;
  }

  & .infinite-scroll-component {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: center;
    height: 100%;
  }
`;

const ProductCard = styled.div<{ number: number }>`
  width: 120px;
  height: 155px;
  background-color: #1d1e20;
  border: solid 1px #383838;
  border-radius: 30px;
  margin: 5px;
  font-size: 0.9em;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  opacity: 0;
  cursor: pointer;
  animation: ${Opacity} 300ms ease-in-out ${({ number }) => number}5ms forwards;

  & h4 {
    margin: 0.4em 0;
    height: 2.4em;
    width: 80%;
    overflow: hidden;
    padding: 0 10px;
    line-height: 1.1em;
    text-overflow: ellipsis;
  }
`;

const ImgContainer = styled.div<{ imgUrl: string | undefined }>`
  width: 100%;
  height: 60%;
  background: rgb(124, 68, 15);
  background: linear-gradient(
    191deg,
    var(--bg-main-color) -40%,
    rgba(29, 30, 32, 1) 100%
  );
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  ${({ imgUrl }) =>
    imgUrl && imgUrl !== "" ? `background-image: url(${imgUrl});` : null}
`;

const PricePill = styled.div`
  padding: 0.2em 0.5em;
  border-radius: 10px;
  background: var(--gradient-1);
  border: solid 2px gray;
  text-align: end;
  margin-top: -1.9em;
`;

const Spiner = styled.img`
  animation: ${SpinnerRotation} 1s linear infinite;
`;

const LoaderContainer = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: center;
`;

const ProductsSelectionBox = () => {
  const { Products, onChangeProducts, bringMoreProducts } = useContext(Context);
  const { addToCart } = useContext(CashContext);

  useEffect(() => {
    const unSubscribe = onChangeProducts();
    return unSubscribe;
  }, [onChangeProducts]);

  return (
    <Container id="infinite-scroll">
      <InfiniteScroll
        dataLength={Products.length}
        next={bringMoreProducts}
        hasMore
        loader={
          <LoaderContainer>
            <Spiner src={pizaSpinner} />
          </LoaderContainer>
        }
        scrollableTarget="infinite-scroll"
      >
        {Products.length !== 0 ? (
          Products.map((product, index) => {
            return (
              <ProductCard
                key={product.id}
                number={index}
                onClick={() => addToCart(product)}
              >
                <ImgContainer imgUrl={product.img_url} />
                <NumericFormat
                    allowLeadingZeros
                    thousandSeparator="."
                    decimalSeparator=","
                    displayType="text"
                    value={product.price}
                    renderText={(value) => (
                      <PricePill>${value}</PricePill>
                    )}
                  />
                <h4>{product.name}</h4>
              </ProductCard>
            );
          })
        ) : (
          <Spiner src={pizaSpinner} />
        )}
      </InfiniteScroll>
    </Container>
  );
};

export default ProductsSelectionBox;
