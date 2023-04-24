import { useState, useContext, useEffect } from "react";
import { KitchenContext } from "../../../../../../../../context/KitchenContext";
import { PayContext } from "../../../../../../../../context/PayContext";
import CartToClient from "../../../../../../../../utils/types/CartToClient";

const useProductsNumber = (cartInView: CartToClient) => {
  const { orders } = useContext(KitchenContext);
  const { debts } = useContext(PayContext);
  const [orderProductsNumber, setOrderProductsNumber] = useState(0);
  const [debtProductsNumber, setDebtProductsNumber] = useState(0);

  useEffect(() => {
    const order = orders.find((item) => item.dbId === cartInView.dbId);
    let number = 0;
    let debtsToClient = debts.filter((item) => item.dbId === cartInView.dbId);
    debtsToClient?.forEach((debt) => {
      debt.products.forEach((item) => {
        number += item.quantity;
      });
    });
    setDebtProductsNumber(number);

    if (order) {
      setOrderProductsNumber(order.itemsNumber);
    }
  }, [cartInView.dbId, cartInView.name, debts, orders]);

  return { orderProductsNumber, debtProductsNumber };
};

export default useProductsNumber;
