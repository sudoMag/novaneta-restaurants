import ProductInCart from "./ProductInCart";

interface CartToClient {
  name: string;
  products: ProductInCart[];
}

export default CartToClient;
