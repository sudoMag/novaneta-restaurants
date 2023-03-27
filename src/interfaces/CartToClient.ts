import ProductInCart from "./ProductInCart";

interface CartToClient {
  dbId: string;
  id: number;
  name: string;
  type: string;
  products: ProductInCart[];
  itemsNumber: number;
  status: string;
  amount: number
}

export default CartToClient;
