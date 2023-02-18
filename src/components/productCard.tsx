import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from "../context/ProductContext";

const Card = styled.div`
  background: gray;
  width: 200px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  height: 300px;
  background: #403834;
  border: solid black 3px;
  color: white;

  h2 {
    text-transform: capitalize;
  }

  h3 {
    color: #ffa500;
    margin: 0;
  }
`;

const Info = styled.div`
  padding: 0 15px;
`;

const ProductImg = styled.img`
  width: 200px;
`;

interface ICardData {
  cardData: {
    name: string;
    price: number;
    imageRef: string;
  };
}

const ProductCard = ({ cardData }: ICardData) => {
  //const [image, setImage] = useState("");
  const { name, price, imageRef } = cardData;
  //const { getImage } = useContext(Context);

  /* const updateImage = (URL: string): void => {
    setImage(URL);
  }; */

  useEffect(() => {
    if (imageRef) {
      /* getImage(imageRef, (URL) => {
        updateImage(URL);
        console.log(URL);
      }); */
    }
  }, [imageRef]);

  useEffect(() => {
    console.log(cardData);
  }, [cardData]);

  return (
    <Card className="main-font">
      {/* {image !== "" ? <ProductImg src={image} /> : null}
      <Info>
        <h2>{name}</h2>
        <h3>{price}💰</h3>
      </Info> */}
    </Card>
  );
};

export default ProductCard;
