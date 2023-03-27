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
import CartToClient from "../interfaces/CartToClient";
import Product from "../interfaces/Product";
import ProductInCart from "../interfaces/ProductInCart";
import { UserContext } from "./UserContext";

interface IContext {
  cart: ProductInCart[];
  cartToClient: CartToClient[];
  showClientCart: (name: string) => void;
  selectEventToggle: () => void;
  selectClientEvent: boolean;
  cartId: string | undefined;
  selectedCart: number;
  setIdforCartId: (id: string | undefined) => void;
  createClientCart: (name: string, type?: string) => void;
  addToCart: (product: Product) => void;
  addToClientCart: (id: string, product: Product) => void;
  emptyClientCart: (id: string, sendedToKitchen?: boolean) => void;
  removeToCart: (productID: string) => void;
  deleteCart: (dbId: string) => void;
  increaseQuantity: (productID: string) => void;
  reduceQuantity: (productID: string) => void;
}

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
  createClientCart: (name: string, type?: string) => {},
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

  const setIdforCartId = (id: string | undefined) => {
    setCartId(id);
    setSelectedCart(cartToClient.findIndex((item) => item.dbId === id));
  };

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

  const createClientCart = (name: string, type?: string) => {
    addDoc(collection(db, `Users/${user?.uid}/Carts`), {
      id: cartToClient.length,
      name: name,
      type: type ? type : "in table",
      products: [],
      itemsNumber: 0,
      status: "empty",
      amount: 0,
    }).then((doc) => {
      return doc.id;
    });
  };

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

  const deleteCart = (dbId: string) => {
    deleteDoc(doc(db, `Users/${user?.uid}/Carts/${dbId}`));
  };

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

  const selectEventToggle = () => {
    setSelectClientEvent(!selectClientEvent);
  };

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
