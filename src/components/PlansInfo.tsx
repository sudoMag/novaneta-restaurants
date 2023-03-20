import styled from "styled-components";
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

const Container = styled.section`
  margin: 10px;
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-items: start;
  background-color: #7a7a7a38;
  border-radius: 20px;
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
  backdrop-filter: blur(10px);
  height: 100%;
  margin: 0;
  padding: 5px 5px;
  position: sticky;
  background-color: #7a7a7a38;
  top: 10px;
  border-radius: 10px;
  width: 99%;
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

  & h3 {
    font-size: 1.1em;
    margin: 0 0 5px;
  }
`;

export const PlanDescription = styled.article`
  overflow: hidden;
`;

export const PlansInfo = () => {
  const { Products, onChangeProducts } = useContext(Context);
  const [layoutMap, setLayoutMap] = useState<number[]>([
    50,
    200,
    200,
    200,
    200,
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
    <ScrollFrame>
      <Container className="mobile-change center-items">
        <ColumsHeadTitleContainer
          className="noselect"
          gridColumnsLayout={makeLayoutString(layoutMap)}
          onMouseMove={seeMouseAxis}
          onMouseLeave={() => setInitialAxis({ axis: 0, index: undefined })}
          onMouseUp={() => setInitialAxis({ axis: 0, index: undefined })}
        >
          <ColumnHeader>Nro</ColumnHeader>
          <ColumnHeader
            onMouseDown={(e) => writeInitialAxis(e, 1)}
          >
            ID
          </ColumnHeader>
          <ColumnHeader
            onMouseDown={(e) => writeInitialAxis(e, 2)}
          >
            Nombre
          </ColumnHeader>
          <ColumnHeader
            onMouseDown={(e) => writeInitialAxis(e, 3)}
          >
            Precio de venta
          </ColumnHeader>
          <ColumnHeader
            onMouseDown={(e) => writeInitialAxis(e, 4)}
          >
            Descripción
          </ColumnHeader>
        </ColumsHeadTitleContainer>
        {Products.length !== 0 ? (
          Products.map((Product, index) => {
            return (
              <PlanCard
                className={Product.name === "Enterprise" ? "premium-plan" : ""}
                key={index}
                gridColumnsLayout={makeLayoutString(layoutMap)}
              >
                <div>{index + 1}</div>
                <div>{Product.id}</div>
                <PlanTitle>{Product.name}</PlanTitle>
                <PlanProduct>$ {Product.price}</PlanProduct>
                <PlanDescription>{Product.description}</PlanDescription>
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
