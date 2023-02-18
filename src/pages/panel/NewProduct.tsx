import { ChangeEvent, FormEvent, useContext, useState } from "react";
import styled from "styled-components";
import Logo from "../../icons/logowhite.svg";
import { LeftContent, RightContent } from "../../components/SplittedPanel";
import { Context } from "../../context/ProductContext";
import Product from "../../interfaces/Product";
import { PlansInfo } from "../../components/PlansInfo";

const Container = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const StyledForm = styled.form``;

const Input = styled.input`
  height: 20px;
  background-color: #444048;
  border-radius: 10px;
  border: solid 1px white;
  text-align: center;
  padding: 10px;
`;

const ProductDataBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputsContainer = styled.div`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const InputAndText = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & h5 {
    margin: 0 10px;
  }
`;

const SendButton = styled.button`
  display: block;
  text-align: center;
  font-weight: bold;
  background-color: #a45b17;
  color: white;
  padding: 0.8em 0.8em;
  line-height: 1;
  border-radius: 8px;
  cursor: pointer;
  border: solid 1px #919191;
`;

const NewProduct = () => {
  const { addProduct } = useContext(Context);
  const [data, setData] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addProduct(data);
    setData({id: "", name: "", description: "", price: 0 });
  };

  const onInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({
      ...data,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <Container>
      <LeftContent>
        <img src={Logo} alt="logo novaneta" />
        <h3>Productos</h3>
        <PlansInfo/>
      </LeftContent>
      <RightContent>
        <StyledForm onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <ProductDataBox>
            <InputsContainer>
              <InputAndText>
                <Input
                  placeholder="Hamburguesa"
                  name="name"
                  value={data.name}
                  onChange={onInputChangeHandler}
                />
                <h5>Nombre</h5>
              </InputAndText>
              <InputAndText>
                <Input
                  placeholder="cuenta con doble carne y extra salsa de tomate"
                  name="description"
                  value={data.description}
                  onChange={onInputChangeHandler}
                />
                <h5>Descripción</h5>
              </InputAndText>
              <InputAndText>
                <Input
                  type="number"
                  name="price"
                  value={data.price}
                  onChange={onInputChangeHandler}
                />
                <h5>Precio</h5>
              </InputAndText>
              <SendButton type="submit">Crear Producto</SendButton>
            </InputsContainer>
          </ProductDataBox>
        </StyledForm>
      </RightContent>
    </Container>
  );
};

export default NewProduct;
