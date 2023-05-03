import styled from "styled-components";
import { LeftContent, RightContent } from "../../../components/SplittedPanel";

export const Container = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const NewLeftLayout = styled(LeftContent)`
  width: 100%;
`;

export const NewRightLayout = styled(RightContent)`
  width: 50%;
`;

export const StyledForm = styled.form``;

export const Input = styled.input`
  height: 35px;
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

export const UploadButton = styled.div<{
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

export const ProductDataBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputsContainer = styled.div`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const InputAndText = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & h5 {
    margin: 0 10px;
  }
`;

export const SendButton = styled.button`
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

export const CreateButton = styled.div`
  padding: 10px 20px;
  background-color: var(--bg-color);
  cursor: pointer;
  border-radius: 8px;
  border: solid 1px #919191;
`;
