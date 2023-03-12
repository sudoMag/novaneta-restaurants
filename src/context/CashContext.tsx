import { createContext, useEffect, useState } from "react";
import CartToClient from "../interfaces/CartToClient";
import Product from "../interfaces/Product";
import ProductInCart from "../interfaces/ProductInCart";

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
  emptyClientCart: (id: number) => void;
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
  emptyClientCart: (id: number) => {},
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
    setCartToClient([
      ...cartToClient,
      {
        id: cartToClient.length,
        name: name,
        type: type ? type : "in table",
        products: [],
        itemsNumber: 0,
        status: "empty",
      },
    ]);
  };

  const addToClientCart = (id: number, product: Product) => {
    const clientCartIndex = cartToClient.findIndex((item) => item.id === id);
    const machProductIndex = cartToClient[clientCartIndex].products.findIndex(
      (item) => item.product.id === product.id
    );
    let number = 0;
    if (machProductIndex !== -1) {
      let newCart: CartToClient[];
      newCart = cartToClient;
      if (newCart[id].products.length !== 0) {
        newCart[id].products[machProductIndex].quantity++;
        newCart[id].products.forEach((item) => {
          number += item.quantity;
        });
      }
      newCart[id].itemsNumber = number;
      newCart[clientCartIndex].status = "ordering";
      setCartToClient([...newCart]);
    } else if (machProductIndex === -1) {
      let newCart = cartToClient;
      newCart[clientCartIndex].products.push({
        product: product,
        quantity: 1,
      });
      newCart[id].products.forEach((item) => {
        number += item.quantity;
      });
      newCart[clientCartIndex].itemsNumber = number;
      newCart[clientCartIndex].status = "ordering";
      setCartToClient([...newCart]);
    }
  };

  const emptyClientCart = (id: number) => {
    const inClientCart = cartToClient.findIndex((item) => item.id === id);
    let newCart = cartToClient;
    if (inClientCart !== -1) {
      newCart[inClientCart].products = [];
      newCart[inClientCart].status = "empty";
      setCartToClient([...newCart]);
    }
  };

  const removeToCart = (productID: string) => {
    if (cartId === undefined) {
      let cartWithoutProduct = cart.filter(
        (item) => item.product.id !== productID
      );

      setCart(cartWithoutProduct);
    } else {
      let newCart = cartToClient
      let cartWithoutProduct = cartToClient[cartId].products.filter((item) => {
        return item.product.id !== productID;
      });
      newCart[cartId].products = cartWithoutProduct;
      setCartToClient([...newCart]);
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
      let itemIndex = cartToClient[cartId].products.findIndex(
        (item) => item.product.id === productID
      );

      if (itemIndex !== -1) {
        let newListItems = cartToClient;
        newListItems[cartId].products[itemIndex].quantity++;
        setCartToClient([...newListItems]);
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
      let itemIndex = cartToClient[cartId].products.findIndex(
        (item) => item.product.id === productID
      );

      if (
        itemIndex !== -1 &&
        cartToClient[cartId].products[itemIndex].quantity !== 1
      ) {
        let newListItems = cartToClient;
        newListItems[cartId].products[itemIndex].quantity--;
        setCartToClient([...newListItems]);
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

  useEffect(() => {}, [cart]);

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
