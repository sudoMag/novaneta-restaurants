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
import Product from "../interfaces/Product";
import ProductInCart from "../interfaces/ProductInCart";
import { UserContext } from "./UserContext";

interface IContext {
  cart: ProductInCart[];
  cartToClient: CartToClient[];
  showClientCart: (name: string) => void;
  selectEventToggle: () => void;
  selectClientEvent: boolean;
  cartId: number | undefined;
  setIdforCartId: (id: number | undefined) => void;
  createClientCart: (name: string, type?: string) => void;
  addToCart: (product: Product) => void;
  addToClientCart: (id: number, product: Product) => void;
  emptyClientCart: (id: number, sendedToKitchen?: boolean) => void;
  removeToCart: (productID: string) => void;
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
  setIdforCartId: (id: number | undefined) => {},
  createClientCart: (name: string, type?: string) => {},
  addToClientCart: (id: number, product: Product) => {},
  emptyClientCart: (id: number, sendedToKitchen?: boolean) => {},
  removeToCart: (productID: string) => {},
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
  const [cartId, setCartId] = useState<number | undefined>(undefined);
  const [cartToClient, setCartToClient] = useState<CartToClient[]>([]);
  const [selectClientEvent, setSelectClientEvent] = useState(false);

  const setIdforCartId = (id: number | undefined) => {
    setCartId(id);
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
    }).then((doc) => {
      return doc.id;
    });
  };

  const addToClientCart = (id: number, product: Product) => {
    let newCart = cartToClient[id];
    const machProductIndex = newCart.products.findIndex(
      (item) => item.product.id === product.id
    );
    let number = 0;
    if (machProductIndex !== -1) {
      if (newCart.products.length !== 0) {
        newCart.products[machProductIndex].quantity++;
        newCart.products.forEach((item) => {
          number += item.quantity;
        });
      }
      newCart.itemsNumber = number;
      newCart.status = "ordering";
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
    }

    updateDoc(doc(db, `Users/${user?.uid}/Carts/${newCart.dbId}`), {
      ...newCart,
    });
  };

  const emptyClientCart = (id: number, sendedToKitchen?: boolean) => {
    const inClientCart = cartToClient.findIndex((item) => item.id === id);
    let newCart = cartToClient;
    let number = 0;
    if (inClientCart !== -1) {
      newCart[inClientCart].products = [];
      if (sendedToKitchen) {
        newCart[inClientCart].status = "in kitchen";
      } else {
        newCart[inClientCart].status = "empty";
      }
      newCart[inClientCart].products.forEach((item) => {
        number += item.quantity;
      });
      newCart[inClientCart].itemsNumber = number;
      setCartToClient([...newCart]);
    }
  };

  const removeToCart = (productID: string) => {
    if (cartId === undefined) {
      let cartWithoutProduct = cart.filter(
        (item) => item.product.id !== productID
        );
        setCart(cartWithoutProduct)
      } else {
      let newCart = cartToClient[cartId];
      let number = 0;
      let cartWithoutProduct = cartToClient[cartId].products.filter((item) => {
        return item.product.id !== productID;
      });
      newCart.products = cartWithoutProduct;
      newCart.products.forEach((item) => {
        number += item.quantity;
      });
      newCart.itemsNumber = number;
      updateDoc(doc(db, `Users/${user?.uid}/Carts/${newCart.dbId}`), {
        ...newCart,
      });
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
      let newListItems = cartToClient[cartId];
      let itemIndex = newListItems.products.findIndex(
        (item) => item.product.id === productID
      );

      if (itemIndex !== -1) {
        let number = 0;
        newListItems.products[itemIndex].quantity++;
        newListItems.products.forEach((item) => {
          number += item.quantity;
        });
        newListItems.itemsNumber = number;
        updateDoc(doc(db, `Users/${user?.uid}/Carts/${newListItems.dbId}`), {
          ...newListItems,
        });
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
      let newListItems = cartToClient[cartId];
      let itemIndex = newListItems.products.findIndex(
        (item) => item.product.id === productID
      );

      if (
        itemIndex !== -1 &&
        newListItems.products[itemIndex].quantity !== 1
      ) {
        let number = 0;
        newListItems.products[itemIndex].quantity--;
        newListItems.products.forEach((item) => {
          number += item.quantity;
        });
        newListItems.itemsNumber = number;
        updateDoc(doc(db, `Users/${user?.uid}/Carts/${newListItems.dbId}`), {
          ...newListItems,
        });
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
    const q = query(collection(db, `Users/${user?.uid}/Carts`), orderBy("id", "asc"));
    const unsubscribe = onSnapshot(
      q,
      (docs) => {
        let data: CartToClient[] = [];
        docs.forEach((item) => {
          const { id, name, type, products, itemsNumber, status } = item.data();
          data.push({
            dbId: item.id,
            id,
            name,
            type,
            products,
            itemsNumber,
            status,
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
        increaseQuantity,
        reduceQuantity,
      }}
    >
      {children}
    </CashContext.Provider>
  );
};
