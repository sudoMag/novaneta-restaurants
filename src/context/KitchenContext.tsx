import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/configuration";
import CartToClient from "../interfaces/CartToClient";
import Order from "../interfaces/Order";
import { CashContext } from "./CashContext";
import { UserContext } from "./UserContext";

interface IContext {
  orders: Order[];
  ordersInView: Order[] | undefined;
  sendToTheKitchen: (cart: CartToClient) => void;
  increaseQuantity: (id: string, productId: string) => void;
  reduceQuantity: (id: string, productId: string) => void;
}

export const KitchenContext = createContext<IContext>({
  orders: [],
  ordersInView: undefined,
  sendToTheKitchen: (cart: CartToClient) => {},
  increaseQuantity: (id: string, productId: string) => {},
  reduceQuantity: (id: string, productId: string) => {},
});

export const KitchenContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersInView, setOrderInView] = useState<Order[] | undefined>();
  const { emptyClientCart, cartId } = useContext(CashContext);

  const sendToTheKitchen = (cart: CartToClient) => {
    addDoc(collection(db, `Users/${user?.uid}/KitchenOrders`), {
      ...cart,
      status: "in kitchen",
      prepared: 0,
      preparedList: [],
    })
      .then((doc) => {
        return doc.id;
      })
      .then(() => {
        emptyClientCart(cart.dbId, true);
      });
  };

  const increaseQuantity = (id: string, productId: string) => {
    let newOrderUpdate = orders.find((order) => order.thisDocId === id);

    if (
      newOrderUpdate !== undefined &&
      newOrderUpdate.prepared <= newOrderUpdate.itemsNumber - 1
      ) {
      let isPrepared = newOrderUpdate.preparedList.findIndex((item) => item === productId)
      const product = newOrderUpdate.products.find(
        (item) => item.product.id === productId
      );
      if (product !== undefined && isPrepared === -1) {
        newOrderUpdate.preparedList.push(productId);
        newOrderUpdate.prepared += product.quantity;
        updateDoc(
          doc(
            db,
            `Users/${user?.uid}/KitchenOrders/${newOrderUpdate.thisDocId}`
          ),
          {
            ...newOrderUpdate,
          }
        );
      }
    }
  };

  const reduceQuantity = (id: string, productId: string) => {
    let newOrderUpdate = orders.find((order) => order.thisDocId === id);

    if (newOrderUpdate !== undefined && newOrderUpdate.prepared !== 0) {
      let isPrepared = newOrderUpdate.preparedList.findIndex((item) => item === productId)
      const product = newOrderUpdate.products.find(
        (item) => item.product.id === productId
      );
      if (product !== undefined && isPrepared !== -1) {
        newOrderUpdate.preparedList.splice(isPrepared, 1);
        newOrderUpdate.prepared -= product.quantity;
        updateDoc(
          doc(
            db,
            `Users/${user?.uid}/KitchenOrders/${newOrderUpdate.thisDocId}`
          ),
          {
            ...newOrderUpdate,
          }
        );
      }
    }
  };

  useEffect(() => {
    setOrderInView(orders.filter((item) => item.dbId === cartId));
  }, [cartId, orders]);

  useEffect(() => {
    const q = query(
      collection(db, `Users/${user?.uid}/KitchenOrders`),
      orderBy("id", "asc")
    );
    const unsubscribe = onSnapshot(
      q,
      (docs) => {
        let data: Order[] = [];
        docs.forEach((item) => {
          const {
            dbId,
            id,
            name,
            type,
            products,
            itemsNumber,
            status,
            prepared,
            preparedList,
          } = item.data();
          data.push({
            dbId,
            id,
            name,
            type,
            products,
            itemsNumber,
            status,
            prepared,
            preparedList,
            thisDocId: item.id,
          });
        });
        setOrders(data);
      },
      (error) => {
        console.error(error);
      }
    );
    return unsubscribe;
  }, [user?.uid]);

  return (
    <KitchenContext.Provider
      value={{
        orders,
        ordersInView,
        sendToTheKitchen,
        increaseQuantity,
        reduceQuantity,
      }}
    >
      {children}
    </KitchenContext.Provider>
  );
};
