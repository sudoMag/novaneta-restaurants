import { ChangeEvent, MouseEvent } from "react";
import styled from "styled-components";

const InputButton = styled.input`
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 10px;
  background-color: #000000;
  border: 3px solid black;
  color: #ffffff;
  margin: 5px;
  padding: 5px 8px;
  cursor: pointer;

  &:hover {
    background-color: #453481;
  }

  &.selected {
    background-color: #3f15d6;
  }
`;

const SelectButton = ({
  buttonName,
  buttonValue,
  onChangeFunction,
  selectedOption,
}: {
  buttonName: string;
  buttonValue: string;
  buttonKey: string;
  selectedOption: string;
  onChangeFunction: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | MouseEvent<HTMLInputElement>
  ) => void;
}) => {

  return (
    <InputButton
      type="button"
      name={buttonName}
      onClick={onChangeFunction}
      value={buttonValue}
      className={
        selectedOption === buttonValue ? "selected" : "not-selected"
      }
    />
  );
};

export default SelectButton;
