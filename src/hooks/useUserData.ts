import { useState } from "react";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../firebase/configuration";

const useUserData = () => {
  const [userData, setUserData] = useState<DocumentData | undefined>();

  const getUserDataFromDB = async (userID: string) => {
    const snapshot = await getDoc(doc(db, `clientes/${userID}`));
    const userDoc = snapshot.data();
    setUserData(userDoc);
  };

  return { userData, getUserDataFromDB };
};

export default useUserData;
