import { useState, useContext, KeyboardEvent, ChangeEvent } from "react";
import { CashContext } from "../../../../../../context/CashContext";

const useCartName = () => {
  const [showNameInput, setShowNameInput] = useState(false);
  const [name, setName] = useState("");

  const { createClientCart } = useContext(CashContext);

  const inputViewToggle = () => {
    setShowNameInput(!showNameInput);
    setName("");
  };

  const handleSubmmit = (
    e: KeyboardEvent<HTMLInputElement>,
    callBack: () => void
  ) => {
    if (e.key === "Enter" && name !== "") {
      createClientCart(name, "to go");
      setName("");
      setShowNameInput(false);
      callBack();
    }
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return { name, showNameInput, inputViewToggle, handleName, handleSubmmit };
};

export default useCartName;
