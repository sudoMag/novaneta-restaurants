import styled from "styled-components";
import { TemplateH2, TemplateTextArea } from "./skeleton/LoadingTextData";
import { MouseEvent, ChangeEvent, useContext, useEffect } from "react";
import { Context } from "../context/ProductContext";
import SelectButton from "./PlanSelectButton";

const Container = styled.section`
  margin: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  & h3 {
    margin: 0 0 5px;
  }
`;

export const PlanCard = styled.div`
  margin: 20px 0;
  width: 80vw;
  max-width: 400px;
  border-radius: 20px;
  border: 1px solid gray;
  padding: 20px;
  background: #444048;

  &.premium-plan {
    background: linear-gradient(60deg, #00ffd0 10%, #5327f3 100%);
  }
`;

const PlansContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlanProduct = styled.span`
  font-size: 0.58em;
  padding: 0.4em 0.8em;
  border-radius: 50px;
  background-color: #a45b17;
  color: white;
  margin: 0 10px;
`;

export const PlanTitle = styled.h2`
  margin: 0 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
`;

export const PlanDescription = styled.article``;

export const PlansInfo = () => {
  const { Products, onChangeProducts } = useContext(Context);

  /* useEffect(() => {
    const info = ProductsInfo;

    if (Products.length === 0) {
      info.get();
    }

    return () => {
      info.cancel();
    };
  }, [ProductsInfo, Products]); */

  useEffect(() => {
    console.log("useEffect")
    const unSubscribe = onChangeProducts();
    return unSubscribe();
  }, [onChangeProducts]);

  console.log("KELOKENKE")

  return (
    <Container className="mobile-change center-items">
      {Products.length !== 0 ? (
        Products.map((Product) => {
          return (
            <PlanCard
              className={Product.name === "Enterprise" ? "premium-plan" : ""}
              key={Product.name}
            >
              <PlanTitle>
                {Product.name} <PlanProduct>$ {Product.price}</PlanProduct>
              </PlanTitle>
              <PlanDescription>{Product.description}</PlanDescription>
            </PlanCard>
          );
        })
      ) : (
        <>
          <PlanCard>
            <TemplateH2 />
            {TemplateTextArea(2)}
          </PlanCard>
          <PlanCard>
            <TemplateH2 />
            {TemplateTextArea(2)}
          </PlanCard>
          <PlanCard>
            <TemplateH2 />
            {TemplateTextArea(2)}
          </PlanCard>
        </>
      )}
    </Container>
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
