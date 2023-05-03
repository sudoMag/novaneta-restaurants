import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/configuration";
import CartToClient from "../utils/types/CartToClient";
import Order from "../utils/types/Order";
import { CashContext } from "./CashContext";
import { UserContext } from "./UserContext";

interface IContext {
  orders: Order[];
  ordersInView: Order[] | undefined;
  endOrder: (orderId: string) => void;
  sendToTheKitchen: (cart: CartToClient) => void;
  increaseQuantity: (id: string, productId: string) => void;
  reduceQuantity: (id: string, productId: string) => void;
}

export const KitchenContext = createContext<IContext>({
  orders: [],
  ordersInView: undefined,
  endOrder: (orderId: string) => {},
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

  /**
   * Sends the client cart to the kitchen by adding a
   * new document to the KitchenOrders collection in
   * Firestore.
   *
   * @param {CartToClient} cart - The client cart to be
   * sent to the kitchen.
   *
   * @returns void
   */
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

  /**
   * Updates the status of the order with the provided
   * ID to "success" in Firestore.
   *
   * @param {string} orderId - The ID of the order
   * to be updated.
   *
   * @returns void
   */
  const endOrder = (orderId: string) => {
    let newOrderUpdate = orders.find((order) => order.thisDocId === orderId);
    if (newOrderUpdate !== undefined) {
      newOrderUpdate.status = "success";
      updateDoc(doc(db, `Users/${user?.uid}/KitchenOrders/${orderId}`), {
        ...newOrderUpdate,
      });
    }
  };

  /**
   * Increases the quantity of the product with the
   * provided ID in the order with the provided ID by
   * 1 in Firestore.
   *
   * @param {string} id - The ID of the order to be
   * updated.
   * @param {string} productId - The ID of the product
   * to be updated.
   *
   * @returns void
   */
  const increaseQuantity = (id: string, productId: string) => {
    let newOrderUpdate = orders.find((order) => order.thisDocId === id);

    if (
      newOrderUpdate !== undefined &&
      newOrderUpdate.prepared <= newOrderUpdate.itemsNumber - 1
    ) {
      let isPrepared = newOrderUpdate.preparedList.findIndex(
        (item) => item === productId
      );
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

  /**
 * Decreases the quantity of the product with the provided
 * ID in the order with the provided ID by 1 in Firestore.
 *
 * @param {string} id - The ID of the order to be updated.
 * @param {string} productId - The ID of the product to be
 * updated.
 *
 * @returns void
 */
  const reduceQuantity = (id: string, productId: string) => {
    let newOrderUpdate = orders.find((order) => order.thisDocId === id);

    if (newOrderUpdate !== undefined && newOrderUpdate.prepared !== 0) {
      let isPrepared = newOrderUpdate.preparedList.findIndex(
        (item) => item === productId
      );
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
      where("status", "!=", "success"),
      orderBy("status", "asc"),
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
            amount,
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
            amount,
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
        endOrder,
        increaseQuantity,
        reduceQuantity,
      }}
    >
      {children}
    </KitchenContext.Provider>
  );
};
