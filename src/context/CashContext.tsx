import { createContext, useState } from "react";
import CartToClient from "../interfaces/CartToClient";
import Product from "../interfaces/Product";
import ProductInCart from "../interfaces/ProductInCart";

interface IContext {
  cart: ProductInCart[];
  cartToClient: CartToClient[];
  addToCart: (product: Product) => void;
  addToClientCart: (cart: ProductInCart[], name: string) => void;
  removeToCart: (productID: string) => void;
  increaseQuantity: (productID: string) => void;
  reduceQuantity: (productID: string) => void;
}

export const CashContext = createContext<IContext>({
  cart: [],
  cartToClient: [],
  addToCart: (product: Product) => {},
  addToClientCart: (cart: ProductInCart[], name: string) => {},
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
  const [cartToClient, setCartToClient] = useState<CartToClient[]>([]);

  const addToCart = (product: Product) => {
    const machProductIndex = cart.findIndex(
      (item) => item.product.id === product.id
    );

    if (machProductIndex !== -1) {
      let newListItems = cart;
      newListItems[machProductIndex].quantity++;
      setCart([...newListItems]);
    } else {
      setCart([...cart, { product: product, quantity: 1 }]);
    }
  };

  const addToClientCart = (cart: ProductInCart[], name: string) => {
    setCartToClient([
      ...cartToClient,
      {
        name: name,
        products: cart,
      },
    ]);
  };

  const removeToCart = (productID: string) => {
    let cartWithoutProduct = cart.filter(
      (item) => item.product.id !== productID
    );

    setCart(cartWithoutProduct);
  };

  const increaseQuantity = (productID: string) => {
    let itemIndex = cart.findIndex((item) => item.product.id === productID);

    if (itemIndex !== -1) {
      let newListItems = cart;
      newListItems[itemIndex].quantity++;
      setCart([...newListItems]);
    }
  };

  const reduceQuantity = (productID: string) => {
    let itemIndex = cart.findIndex((item) => item.product.id === productID);

    if (itemIndex !== -1 && cart[itemIndex].quantity !== 1) {
      let newListItems = cart;
      newListItems[itemIndex].quantity--;
      setCart([...newListItems]);
    }
  };

  return (
    <CashContext.Provider
      value={{
        cart,
        cartToClient,
        addToCart,
        addToClientCart,
        removeToCart,
        increaseQuantity,
        reduceQuantity,
      }}
    >
      {children}
    </CashContext.Provider>
  );
};
