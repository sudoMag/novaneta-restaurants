import { FormEvent, useContext } from "react";
import Logo from "../../../icons/logowhite.svg";
import { Context } from "../../../context/ProductContext";
import { PlansInfo } from "../../../components/PlansInfo";
import { NumericFormat } from "react-number-format";
import {
  Container,
  CreateButton,
  Input,
  InputAndText,
  InputsContainer,
  NewLeftLayout,
  NewRightLayout,
  ProductDataBox,
  SendButton,
  StyledForm,
  UploadButton,
} from "./NewProductStyles";
import useProductData from "./hooks/useProductData";

const NewProduct = () => {
  const { upLoadProductImg, productImg } = useContext(Context);
  const {
    showInputs,
    data,
    handleSubmit,
    onInputChangeHandler,
    InputsViewToggle,
    editProduct,
  } = useProductData();

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
                  <NumericFormat
                    allowLeadingZeros
                    prefix="$"
                    thousandSeparator="."
                    decimalSeparator=","
                    customInput={Input}
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
