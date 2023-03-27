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

const NewLeftLayout = styled(LeftContent)`
  width: 100%;
`;

const NewRightLayout = styled(RightContent)`
  width: 50%;
`;

const StyledForm = styled.form``;

const Input = styled.input`
  height: 20px;
  background-color: #444048;
  border-radius: 10px;
  border: solid 1px white;
  text-align: center;
  padding: 10px;

  &.file-input {
    opacity: 0;
    width: 150px;
    height: 80px;
    cursor: pointer;
  }
`;

const UploadButton = styled.div<{
  productImg: {
    url: string | undefined;
    progress: number;
  };
}>`
  background: var(--gradient-1);
  border-radius: 10px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  ${({ productImg }) =>
    productImg.url ? `background-image: url(${productImg.url});` : null}
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
  cursor: pointer;
  border-radius: 8px;
  border: solid 1px #919191;
`;

const CreateButton = styled.div`
  padding: 10px 20px;
  background-color: var(--bg-color);
  cursor: pointer;
  border-radius: 8px;
  border: solid 1px #919191;
`;

const NewProduct = () => {
  const {
    addProduct,
    upLoadProductImg,
    productImg,
    updateProduct,
    setImg,
    emptyImg,
  } = useContext(Context);
  const [showInputs, setShowInputs] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
    img_url: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editMode) {
      updateProduct({ ...data, img_url: productImg.url });
    } else {
      addProduct({ ...data, img_url: productImg.url });
    }
    setData({ id: "", name: "", description: "", price: 0, img_url: "" });
    emptyImg();
  };

  const onInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({
      ...data,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const InputsViewToggle = () => {
    setShowInputs(!showInputs);
    setEditMode(false);
  };

  const editProduct = (product: Product) => {
    setEditMode(true);
    setShowInputs(true);
    setData({
      ...data,
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    });
    if (product.img_url) {
      setImg(product.img_url);
    } else {
      setImg("");
    }
  };

  return (
    <Container>
      <NewLeftLayout>
        <img src={Logo} alt="logo novaneta" />
        <h3>Productos</h3>
        <CreateButton className="noselect" onClick={InputsViewToggle}>
          Nuevo
        </CreateButton>
        <PlansInfo editProduct={editProduct} />
      </NewLeftLayout>
      {showInputs ? (
        <NewRightLayout>
          <StyledForm
            onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
          >
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
                <InputAndText>
                  <UploadButton productImg={productImg}>
                    <Input
                      className="file-input"
                      type="file"
                      name="imageFile"
                      accept="image/jpeg, image/png"
                      onChange={upLoadProductImg}
                    />
                  </UploadButton>
                  <h5>imagen</h5>
                </InputAndText>
                <SendButton type="submit">Crear Producto</SendButton>
              </InputsContainer>
            </ProductDataBox>
          </StyledForm>
        </NewRightLayout>
      ) : null}
    </Container>
  );
};

export default NewProduct;
