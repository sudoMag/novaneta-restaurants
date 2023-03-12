import ProductInCart from "./ProductInCart";

interface CartToClient {
  id: number;
  name: string;
  type: string;
  products: ProductInCart[];
  itemsNumber: number;
  status: string;
}

export default CartToClient;
