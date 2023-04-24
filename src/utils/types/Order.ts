import CartToClient from "./CartToClient";

interface Order extends CartToClient {
  prepared: number;
  preparedList: string[]
  thisDocId: string;
}

export default Order;
