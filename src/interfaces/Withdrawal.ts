import { Timestamp } from "firebase/firestore/lite";

export default interface Withdrawal {
  weight: number;
  date: Timestamp;
  paid: boolean;
}
