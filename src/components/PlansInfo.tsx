import styled, { css } from "styled-components";
import { TemplateH2, TemplateTextArea } from "./skeleton/LoadingTextData";
import {
  MouseEvent,
  ChangeEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Context } from "../context/ProductContext";
import SelectButton from "./PlanSelectButton";
import Product from "../interfaces/Product";
import InfiniteScroll from "react-infinite-scroll-component";
import pizaSpinner from "../icons/pizzalight.svg";
import SpinnerRotation from "./animations/SpinnerRotation";
import { isBrowser, isMobile } from "react-device-detect";

const Container = styled.section`
  margin: 10px;
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: start;
  ${isBrowser ? "background-color: #7a7a7a38;" : null}
  border-radius: 20px;
  ${isMobile
    ? css`
        align-items: flex-start;
      `
    : null}
`;

export const PlanCard = styled.div<{ gridColumnsLayout: string }>`
  display: grid;
  grid-gap: 10px;
  width: 98%;
  grid-template-columns: ${({ gridColumnsLayout }) => gridColumnsLayout};
  margin: 5px 0;
  border-radius: 20px;
  border: solid 1px #383838;
  padding: 5px 10px;
  background-color: #1d1e20;
  justify-items: start;
  align-items: center;
`;

const PlansContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-color);
  height: 100%;
  margin: 0;
  padding: 0 5px;
`;

const PlanProduct = styled.span`
  font-size: 0.58em;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: #a45b17;
  color: white;
  margin: 0 2px;
  font-size: 1em;
`;

export const PlanTitle = styled.h2`
  margin: 0 0 5px;
  display: flex;
  justify-content: space-between;
  -webkit-align-items: center;
  align-items: center;
  line-height: 1;
  font-size: 1em;
  background-color: var(--bg-color);
  height: 100%;
  margin: 0;
  padding: 0 5px;
`;

const ColumsHeadTitleContainer = styled.header<{ gridColumnsLayout: string }>`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${({ gridColumnsLayout }) => gridColumnsLayout};
  margin: 5px 0;
  justify-items: start;
  height: 100%;
  margin: 0;
  padding: 5px 5px;
  position: sticky;
  ${isBrowser
    ? css`
        background-color: #7a7a7a38;
        backdrop-filter: blur(10px);
      `
    : null}
  top: 10px;
  border-radius: 10px;
  width: 99%;
  ${isMobile ? "justify-items: stretch;" : null}
`;

const ColumnHeader = styled.div`
  border-radius: 20px;
  border: solid 1px #383838;
  padding: 5px 10px;
  background-color: #1d1e20;
  justify-items: start;
  align-items: center;
  cursor: grab;
`;

const ScrollFrame = styled.div`
  overflow: auto;
  width: 100%;
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
    overflow: unset;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  & h3 {
    font-size: 1.1em;
    margin: 0 0 5px;
  }
`;

export const PlanDescription = styled.article`
  overflow: hidden;
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

const ImgContainer = styled.div<{ imgUrl: string | undefined }>`
  width: 45px;
  height: 25px;
  border-radius: 5px;
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

export const PlansInfo = ({
  editProduct,
}: {
  editProduct: (product: Product) => void;
}) => {
  const { Products, onChangeProducts, bringMoreProducts } = useContext(Context);
  const [layoutMap, setLayoutMap] = useState<number[]>([
    50, 200, 200, 200, 200, 100,
  ]);
  const [initialAxis, setInitialAxis] = useState<{
    axis: number;
    index: number | undefined;
  }>({ axis: 0, index: undefined });

  const makeLayoutString = (layoutArray: number[]) => {
    let stringLayout = "";
    layoutArray.forEach(
      (layoutNumber) => (stringLayout += `${layoutNumber}px `)
    );
    return stringLayout;
  };

  const writeInitialAxis = (e: MouseEvent, index: number) => {
    setInitialAxis({ axis: e.clientX, index: index });
  };

  const seeMouseAxis = (e: MouseEvent) => {
    if (initialAxis.index !== undefined) {
      let newAxisMap = layoutMap;
      if (
        newAxisMap[initialAxis.index - 1] >= 30 ||
        newAxisMap[initialAxis.index - 1] <= 250
      ) {
        newAxisMap[initialAxis.index - 1] =
          newAxisMap[initialAxis.index] - (initialAxis.axis - e.clientX);
        if (newAxisMap[initialAxis.index - 1] <= 0) {
          newAxisMap[initialAxis.index - 1] = 30;
        }
        setLayoutMap([...newAxisMap]);
      }
    }
  };

  useEffect(() => {
    const unSubscribe = onChangeProducts();
    return unSubscribe;
  }, [onChangeProducts]);

  return (
    <ScrollFrame id="infinite-scroll">
      <Container>
        <ColumsHeadTitleContainer
          className="noselect"
          gridColumnsLayout={makeLayoutString(layoutMap)}
          onMouseMove={seeMouseAxis}
          onMouseLeave={() => setInitialAxis({ axis: 0, index: undefined })}
          onMouseUp={() => setInitialAxis({ axis: 0, index: undefined })}
        >
          <ColumnHeader>Nro</ColumnHeader>
          <ColumnHeader onMouseDown={(e) => writeInitialAxis(e, 1)}>
            ID
          </ColumnHeader>
          <ColumnHeader onMouseDown={(e) => writeInitialAxis(e, 2)}>
            Nombre
          </ColumnHeader>
          <ColumnHeader onMouseDown={(e) => writeInitialAxis(e, 3)}>
            Precio de venta
          </ColumnHeader>
          <ColumnHeader onMouseDown={(e) => writeInitialAxis(e, 4)}>
            Descripción
          </ColumnHeader>
          <ColumnHeader onMouseDown={(e) => writeInitialAxis(e, 5)}>
            Imagen
          </ColumnHeader>
        </ColumsHeadTitleContainer>
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
            Products.map((Product, index) => {
              return (
                <PlanCard
                  key={index}
                  gridColumnsLayout={makeLayoutString(layoutMap)}
                  onClick={() => editProduct(Product)}
                >
                  <div>{index + 1}</div>
                  <div>{Product.id}</div>
                  <PlanTitle>{Product.name}</PlanTitle>
                  <PlanProduct>$ {Product.price}</PlanProduct>
                  <PlanDescription>{Product.description}</PlanDescription>
                  <ImgContainer imgUrl={Product.img_url} />
                </PlanCard>
              );
            })
          ) : (
            <>
              <PlanCard gridColumnsLayout={makeLayoutString(layoutMap)}>
                <TemplateH2 />
                {TemplateTextArea(2)}
              </PlanCard>
              <PlanCard gridColumnsLayout={makeLayoutString(layoutMap)}>
                <TemplateH2 />
                {TemplateTextArea(2)}
              </PlanCard>
              <PlanCard gridColumnsLayout={makeLayoutString(layoutMap)}>
                <TemplateH2 />
                {TemplateTextArea(2)}
              </PlanCard>
            </>
          )}
        </InfiniteScroll>
      </Container>
    </ScrollFrame>
  );
};

export const PlanSelection = ({
  onChangeFunction,
  selectedOption,
}: {
  onChangeFunction: (
    e:
      | ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | MouseEvent<HTMLInputElement>
  ) => void;
  selectedOption: string;
}) => {
  const { Products } = useContext(Context);
  return (
    <PlansContainer>
      {Products.length !== 0
        ? Products.map((Product) => {
            return (
              <SelectButton
                buttonName="plan"
                key={Product.name}
                buttonValue={Product.name}
                buttonKey={Product.name}
                onChangeFunction={onChangeFunction}
                selectedOption={selectedOption}
              />
            );
          })
        : "Cargando..."}
    </PlansContainer>
  );
};
