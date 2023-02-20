import { createContext, useState } from "react";
import Product from "../interfaces/Product";
import ProductInCart from "../interfaces/ProductInCart";

interface IContext {
  cart: ProductInCart[];
  addToCart: (product: Product) => void;
  removeToCart: (productID: string) => void;
  increaseQuantity: (productID: string) => void;
  reduceQuantity: (productID: string) => void;
}

export const CashContext = createContext<IContext>({
  cart: [],
  addToCart: (product: Product) => {},
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

  const removeToCart = (productID: string) => {
    /* let cartWithoutProduct: ProductInCart[] = [];

    cart.forEach((item) => {
      if (item.product.id !== ProductID) {
        cartWithoutProduct.push(item);
      }
    }); */

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
      value={{ cart, addToCart, removeToCart, increaseQuantity, reduceQuantity }}
    >
      {children}
    </CashContext.Provider>
  );
};
