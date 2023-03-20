import { Timestamp } from "firebase/firestore";

export default interface Client {
  id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  rut: string;
  creationDate: Timestamp;
  casherId: string;
}
