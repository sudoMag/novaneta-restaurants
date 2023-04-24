import { useContext, useEffect } from "react";
import { CashContext } from "../../../../../context/CashContext";
import { Context } from "../../../../../context/ProductContext";
import pizaSpinner from "../../../../../icons/pizzalight.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import { NumericFormat } from "react-number-format";
import {
  Container,
  ImgContainer,
  LoaderContainer,
  PricePill,
  ProductCard,
  Spiner,
} from "./ProductsSelectionBoxStyles";

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
        loader={<LoaderContainer />}
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
                  renderText={(value) => <PricePill>${value}</PricePill>}
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
