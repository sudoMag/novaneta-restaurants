import { useCallback, useState } from "react";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../firebase/configuration";

const useUserData = () => {
  const [userData, setUserData] = useState<DocumentData | undefined>();

  const getUserDataFromDB = useCallback(async (userID: string) => {
    const snapshot = await getDoc(doc(db, `Users/${userID}`));
    const userDoc = snapshot.data();
    console.log(userDoc);
    setUserData(userDoc);
  }, [])

  return { userData, getUserDataFromDB };
};

export default useUserData;
