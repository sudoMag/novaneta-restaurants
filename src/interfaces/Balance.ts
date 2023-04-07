import { Timestamp } from "firebase/firestore";

export default interface Balance {
  date: Timestamp;
  amount: number;
}
