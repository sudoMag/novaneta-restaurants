import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/configuration";
import CartToClient from "../utils/types/CartToClient";
import Product from "../utils/types/Product";
import ProductInCart from "../utils/types/ProductInCart";
import { UserContext } from "./UserContext";

/**
 * Defines the structure of the CashContext object, which
 * contains data and functions related to the cash register.
 *
 * @interface IContext
 * @property {ProductInCart[]} cart - An array of products
 * in the cart.
 * @property {CartToClient[]} cartToClient - An array of
 * client carts.
 * @property {Function} showClientCart - A function that
 * sets the cart state to the products array of the cart
 * with the provided name.
 * @property {Function} selectEventToggle - A function
 * that toggles the boolean value of selectClientEvent
 * state.
 * @property {boolean} selectClientEvent - A boolean value
 * that indicates whether a client event is currently
 * selected.
 * @property {string | undefined} cartId - The ID of the
 * cart in Firestore, or undefined if there is no cart
 * in Firestore.
 * @property {number} selectedCart - The index of the
 * selected client cart.
 * @property {Function} setIdforCartId - A function that
 * sets the cart ID state to the provided ID.
 * @property {Function} createClientCart - A function
 * that creates a new client cart with the provided
 * name and type.
 * @property {Function} addToCart - A function that
 * adds a product to the cart.
 * @property {Function} addToClientCart - A function
 * that adds a product to the client cart with the
 * provided ID.
 * @property {Function} emptyClientCart - A function
 * that empties the client cart with the provided ID.
 * @property {Function} removeToCart - A function that
 * removes a product from the cart.
 * @property {Function} deleteCart - A function that
 * deletes the cart with the provided Firestore ID.
 * @property {Function} increaseQuantity - A function
 * that increases the quantity of the product with the
 * provided ID in the cart by 1.
 * @property {Function} reduceQuantity - A function
 * that decreases the quantity of the product with the
 * provided ID in the cart by 1.
 */
interface IContext {
  cart: ProductInCart[];
  cartToClient: CartToClient[];
  showClientCart: (name: string) => void;
  selectEventToggle: () => void;
  selectClientEvent: boolean;
  cartId: string | undefined;
  selectedCart: number;
  setIdforCartId: (id: string | undefined) => void;
  createClientCart: (name: string, type?: "in table" | "to go") => void;
  addToCart: (product: Product) => void;
  addToClientCart: (id: string, product: Product) => void;
  emptyClientCart: (id: string, sendedToKitchen?: boolean) => void;
  removeToCart: (productID: string) => void;
  deleteCart: (dbId: string) => void;
  increaseQuantity: (productID: string) => void;
  reduceQuantity: (productID: string) => void;
}

/**
 * The CashContext object provides a context that
 * can be used to pass data and functions related
 * to the cash register down the component tree.
 *
 * @typedef {Object} CashContext
 * @property {ProductInCart[]} cart - An array of
 * products in the cart.
 * @property {CartToClient[]} cartToClient - An
 * array of client carts.
 * @property {Function} showClientCart - A function
 * that sets the cart state to the products array
 * of the cart with the provided name.
 * @property {Function} selectEventToggle - A
 * function that toggles the boolean value of
 * selectClientEvent state.
 * @property {boolean} selectClientEvent - A
 * boolean value that indicates whether a client
 * event is currently selected.
 * @property {string | undefined} cartId - The ID
 * of the cart in Firestore, or undefined if there
 * is no cart in Firestore.
 * @property {number} selectedCart - The index of
 * the selected client cart.
 * @property {Function} setIdforCartId - A function
 * that sets the cart ID state to the provided ID.
 * @property {Function} createClientCart - A function
 * that creates a new client cart with the provided
 * name and type.
 * @property {Function} addToCart - A function that
 * adds a product to the cart.
 * @property {Function} addToClientCart - A function
 * that adds a product to the client cart with the
 * provided ID.
 * @property {Function} emptyClientCart - A function
 * that empties the client cart with the provided ID.
 * @property {Function} removeToCart - A function that
 * removes a product from the cart.
 * @property {Function} deleteCart - A function that
 * deletes the cart with the provided Firestore ID.
 * @property {Function} increaseQuantity - A function
 * that increases the quantity of the product with the
 * provided ID in the cart by 1.
 * @property {Function} reduceQuantity - A function
 * that decreases the quantity of the product with the
 * provided ID in the cart by 1.
 */
export const CashContext = createContext<IContext>({
  cart: [],
  cartToClient: [],
  showClientCart: (name: string) => {},
  selectClientEvent: false,
  selectEventToggle: () => {},
  addToCart: (product: Product) => {},
  cartId: undefined,
  selectedCart: 0,
  setIdforCartId: (id: string | undefined) => {},
  createClientCart: (name: string, type?: "in table" | "to go") => {},
  addToClientCart: (id: string, product: Product) => {},
  emptyClientCart: (id: string, sendedToKitchen?: boolean) => {},
  removeToCart: (productID: string) => {},
  deleteCart: (dbId: string) => {},
  increaseQuantity: (productID: string) => {},
  reduceQuantity: (productID: string) => {},
});

export const CashContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [cart, setCart] = useState<ProductInCart[]>([]);
  const { user } = useContext(UserContext);
  const [cartId, setCartId] = useState<string | undefined>(undefined);
  const [selectedCart, setSelectedCart] = useState<number>(-1);
  const [cartToClient, setCartToClient] = useState<CartToClient[]>([]);
  const [selectClientEvent, setSelectClientEvent] = useState(false);

  /**
   * Sets a new value for the `cartId` state
   * variable and updates the `selectedCart`
   * state variable based on the provided `id`.
   *
   * @param id A string representing the id of the cart.
   *
   * @returns void
   */
  const setIdforCartId = (id: string | undefined) => {
    setCartId(id);
    setSelectedCart(cartToClient.findIndex((item) => item.dbId === id));
  };

  /**
   * Add the given product to the client cart.
   * If a cart is already selected, the product
   * is added to that cart in the user's client.
   * Otherwise, the product is added to the cart
   * in the application state.
   *
   * @param product The product to be added to the cart.
   *
   * @returns void
   */
  const addToCart = (product: Product) => {
    if (cartId === undefined) {
      let machProductIndex = cart.findIndex(
        (item) => item.product.id === product.id
      );

      if (machProductIndex !== -1) {
        let newListItems = cart;
        newListItems[machProductIndex].quantity++;
        setCart([...newListItems]);
      } else {
        setCart([...cart, { product: product, quantity: 1 }]);
      }
    } else if (cartId !== undefined) {
      addToClientCart(cartId, product);
    }
  };

  /**
   * Creates a new cart for the current user in Firestore
   * with the given name and type.
   *
   * @param name The name of the cart to be created.
   * @param type An optional string indicating the type
   * of cart. Default is "in table".
   *
   * @returns void.
   */
  const createClientCart = (name: string, type?: "in table" | "to go") => {
    addDoc(collection(db, `Users/${user?.uid}/Carts`), {
      id: cartToClient.length,
      name: name,
      type: type ?? "in table",
      products: [],
      itemsNumber: 0,
      status: "empty",
      amount: 0,
    }).then((doc) => {
      return doc.id;
    });
  };

  /**
   * Adds the given product to the cart with the provided
   * ID in the user's client. If the product is already in
   * the cart, its quantity is incremented. Otherwise,
   * a new item is added to the cart with a quantity of 1.
   *
   * @param id The ID of the cart to which the product is
   * to be added.
   * @param product The product to be added to the cart.
   *
   * @returns void
   */
  const addToClientCart = (id: string, product: Product) => {
    let newCart = cartToClient.find((item) => item.dbId === id);
    if (newCart !== undefined) {
      const machProductIndex = newCart.products.findIndex(
        (item) => item.product.id === product.id
      );
      let number = 0;
      let amount = 0;
      if (machProductIndex !== -1) {
        if (newCart.products.length !== 0) {
          newCart.products[machProductIndex].quantity++;
          newCart.products.forEach((item) => {
            number += item.quantity;
          });
        }
        newCart.itemsNumber = number;
        newCart.status = "ordering";
        newCart.products.forEach((item) => {
          amount += item.product.price * item.quantity;
        });
        newCart.amount = amount;
      } else if (machProductIndex === -1) {
        newCart.products.push({
          product: product,
          quantity: 1,
        });
        newCart.products.forEach((item) => {
          number += item.quantity;
        });
        newCart.itemsNumber = number;
        newCart.status = "ordering";
        newCart.products.forEach((item) => {
          amount += item.product.price * item.quantity;
        });
        newCart.amount = amount;
      }
      updateDoc(doc(db, `Users/${user?.uid}/Carts/${newCart.dbId}`), {
        ...newCart,
      });
    }
  };

  /**
   * Empties the cart with the provided ID in the user's
   * client. If `sendedToKitchen` is `true`, sets the cart
   * status to "in kitchen". Otherwise, sets it to "empty".
   *
   * @param id The ID of the cart to be emptied.
   * @param sendedToKitchen An optional boolean indicating
   * whether the cart has been sent to the kitchen. Default
   * is `false`.
   *
   * @returns void
   */
  const emptyClientCart = (id: string, sendedToKitchen?: boolean) => {
    let newCart = cartToClient.find((item) => item.dbId === id);
    let number = 0;
    let amount = 0;
    if (newCart !== undefined) {
      newCart.products = [];
      if (sendedToKitchen) {
        newCart.status = "in kitchen";
      } else {
        newCart.status = "empty";
      }
      newCart.products.forEach((item) => {
        number += item.quantity;
      });
      newCart.itemsNumber = number;
      newCart.products.forEach((item) => {
        amount += item.product.price * item.quantity;
      });
      newCart.amount = amount;
      updateDoc(doc(db, `Users/${user?.uid}/Carts/${newCart.dbId}`), {
        ...newCart,
      });
    }
  };

  /**
   * Deletes the cart with the provided ID from Firestore.
   *
   * @param dbId The ID of the cart to be deleted.
   *
   * @returns void
   */
  const deleteCart = (dbId: string) => {
    deleteDoc(doc(db, `Users/${user?.uid}/Carts/${dbId}`));
  };

  /**
   * Removes the product with the provided ID from the cart.
   * If a cart ID is specified, updates the corresponding
   * cart in Firestore. Otherwise, updates the local state
   * of the cart.
   *
   * @param productID The ID of the product to be removed
   * from the cart.
   *
   * @returns void
   */
  const removeToCart = (productID: string) => {
    if (cartId === undefined) {
      let cartWithoutProduct = cart.filter(
        (item) => item.product.id !== productID
      );
      setCart(cartWithoutProduct);
    } else {
      let newCart = cartToClient.find((item) => item.dbId === cartId);
      let number = 0;
      let amount = 0;
      if (newCart !== undefined) {
        let cartWithoutProduct = newCart.products.filter((item) => {
          return item.product.id !== productID;
        });
        newCart.products = cartWithoutProduct;
        newCart.products.forEach((item) => {
          number += item.quantity;
        });
        newCart.itemsNumber = number;
        newCart.products.forEach((item) => {
          amount += item.product.price * item.quantity;
        });
        newCart.amount = amount;
        updateDoc(doc(db, `Users/${user?.uid}/Carts/${newCart.dbId}`), {
          ...newCart,
        });
      }
    }
  };

  /**
   * Increases the quantity of the product with the provided
   * ID in the cart by 1. If a cart ID is specified, updates
   * the corresponding cart in Firestore. Otherwise, updates
   * the local state of the cart.
   *
   * @param productID The ID of the product to be updated.
   *
   * @returns void
   */
  const increaseQuantity = (productID: string) => {
    if (cartId === undefined) {
      let itemIndex = cart.findIndex((item) => item.product.id === productID);

      if (itemIndex !== -1) {
        let newListItems = cart;
        newListItems[itemIndex].quantity++;
        setCart([...newListItems]);
      }
    } else {
      let newListItems = cartToClient.find((item) => item.dbId === cartId);
      if (newListItems !== undefined) {
        let itemIndex = newListItems.products.findIndex(
          (item) => item.product.id === productID
        );

        if (itemIndex !== -1) {
          let number = 0;
          let amount = 0;
          newListItems.products[itemIndex].quantity++;
          newListItems.products.forEach((item) => {
            number += item.quantity;
          });
          newListItems.itemsNumber = number;
          newListItems.products.forEach((item) => {
            amount += item.product.price * item.quantity;
          });
          newListItems.amount = amount;
          updateDoc(doc(db, `Users/${user?.uid}/Carts/${newListItems.dbId}`), {
            ...newListItems,
          });
        }
      }
    }
  };

  /**
   * Decreases the quantity of the product with the provided
   * ID in the cart by 1. If a cart ID is specified, updates
   * the corresponding cart in Firestore. Otherwise, updates
   * the local state of the cart.
   *
   * @param productID The ID of the product to be updated.
   *
   * @returns void
   */
  const reduceQuantity = (productID: string) => {
    if (cartId === undefined) {
      let itemIndex = cart.findIndex((item) => item.product.id === productID);

      if (itemIndex !== -1 && cart[itemIndex].quantity !== 1) {
        let newListItems = cart;
        newListItems[itemIndex].quantity--;
        setCart([...newListItems]);
      }
    } else {
      let newListItems = cartToClient.find((item) => item.dbId === cartId);
      if (newListItems !== undefined) {
        let itemIndex = newListItems.products.findIndex(
          (item) => item.product.id === productID
        );

        if (
          itemIndex !== -1 &&
          newListItems.products[itemIndex].quantity !== 1
        ) {
          let number = 0;
          let amount = 0;
          newListItems.products[itemIndex].quantity--;
          newListItems.products.forEach((item) => {
            number += item.quantity;
          });
          newListItems.itemsNumber = number;
          newListItems.products.forEach((item) => {
            amount += item.product.price * item.quantity;
          });
          newListItems.amount = amount;
          updateDoc(doc(db, `Users/${user?.uid}/Carts/${newListItems.dbId}`), {
            ...newListItems,
          });
        }
      }
    }
  };

  /**
   * Toggles the boolean value of selectClientEvent state
   * between true and false.
   *
   * @returns void
   */
  const selectEventToggle = () => {
    setSelectClientEvent(!selectClientEvent);
  };

  /**
   * Sets the cart state to the products array of the cart
   * with the provided name.
   *
   * @param name The name of the cart to be displayed.
   *
   * @returns void
   */
  const showClientCart = (name: string) => {
    const cartMatch = cartToClient.find((item) => item.name === name);

    if (cartMatch) {
      setCart(cartMatch.products);
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, `Users/${user?.uid}/Carts`),
      orderBy("id", "asc")
    );
    const unsubscribe = onSnapshot(
      q,
      (docs) => {
        let data: CartToClient[] = [];
        docs.forEach((item) => {
          const { id, name, type, products, itemsNumber, status, amount } =
            item.data();
          data.push({
            dbId: item.id,
            id,
            name,
            type,
            products,
            itemsNumber,
            status,
            amount,
          });
        });
        setCartToClient(data);
      },
      (error) => {
        console.error(error);
      }
    );
    return unsubscribe;
  }, [user?.uid]);

  return (
    <CashContext.Provider
      value={{
        cart,
        cartId,
        selectedCart,
        setIdforCartId,
        selectClientEvent,
        selectEventToggle,
        cartToClient,
        showClientCart,
        addToCart,
        createClientCart,
        addToClientCart,
        emptyClientCart,
        removeToCart,
        deleteCart,
        increaseQuantity,
        reduceQuantity,
      }}
    >
      {children}
    </CashContext.Provider>
  );
};
