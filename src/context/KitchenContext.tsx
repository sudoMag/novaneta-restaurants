import { createContext, useContext, useState } from "react";
import CartToClient from "../interfaces/CartToClient";
import { CashContext } from "./CashContext";

interface IContext {
  orders: CartToClient[];
  sendToTheKitchen: (cart: CartToClient) => void;
}

export const KitchenContext = createContext<IContext>({
  orders: [],
  sendToTheKitchen: (cart: CartToClient) => {},
});

export const KitchenContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [orders, setOrders] = useState<CartToClient[]>([]);
  const { emptyClientCart } = useContext(CashContext);

  const sendToTheKitchen = (cart: CartToClient) => {
    let machCartIndex = orders.findIndex(order => order.id === cart.id);
    const newList = orders
    if (machCartIndex !== -1) {
      newList[machCartIndex].products.concat(cart.products);
        let number = 0;
        newList[cart.id].products.forEach((item) => {
          number += item.quantity;
        });
        newList[cart.id].itemsNumber = number;
        setOrders([...newList]);
    } else {
      let number = 0;
      const newList = orders;
      newList.push(cart);
      newList[cart.id].products.forEach((item) => {
        number += item.quantity;
      });
      newList[cart.id].itemsNumber = number;
      setOrders([...newList]);
    }
  }

  return <KitchenContext.Provider value={{orders ,sendToTheKitchen}}>{children}</KitchenContext.Provider>;
};
