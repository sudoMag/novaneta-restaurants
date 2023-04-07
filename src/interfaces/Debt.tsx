import { Timestamp } from "firebase/firestore";
import CartToClient from "./CartToClient";

export default interface Debt extends CartToClient {
  thisDocId: string;
  casherId: string;
  date: Timestamp;
  paidDate?: Timestamp;
  collectorId?: string;
  status: string;
  payType: string;
  clientId?: string;
  orderId: string;
}