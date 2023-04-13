import { Timestamp } from "firebase/firestore";
import Debt from "./Debt";

export default interface Balance {
  date: Timestamp;
  amount: number;
  debts: Debt[];

}
