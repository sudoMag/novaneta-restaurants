import { createContext, useEffect, useRef, useState } from "react";

interface Product {
  name: string;
  description: string;
  price: number;
  amount: number;
}

interface Pay {
  amount: number;
  cart: Product[];
  addToCart: (product: Product) => void;
}

export const Context = createContext<Pay>({
  amount: 0,
  cart: [],
  addToCart: (product: Product) => {},
});

export const PayContext = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [cart, setCart] = useState<Product[]>([]);
  const TotalNumber = useRef<number>(0);

  const addToCart = (product: Product) => {
    const isInCart = cart.findIndex(
      (productInCart) => productInCart.name === product.name
    );

    if (!isInCart) {
      setCart([...cart, product]);
    } else if (isInCart) {
      let products = cart;
      products[isInCart].amount++;
      setCart(products);
    }
  };

  useEffect(() => {
    cart.forEach((productInCart) => {
      TotalNumber.current += productInCart.price;
    });
  }, [cart]);

  return (
    <Context.Provider value={{ amount, cart, addToCart }}>
      {children}
    </Context.Provider>
  );
};
