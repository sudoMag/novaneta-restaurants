import { Timestamp } from "firebase/firestore";

const timestampToString = (date: Timestamp) => {
  return `${new Date(date.toDate()).toLocaleDateString()} ${new Date(
    date.toDate()
  ).getHours()}:${new Date(date.toDate()).getMinutes()}`;
};

export default timestampToString;
