import { useCallback, useState } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../../firebase/configuration";
import Withdrawal from "../../../utils/types/Withdrawal";

const useWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>();

  const getClientWithdrawals = useCallback(async (userID: string) => {
    const snatshop = await getDocs(
      collection(db, `clientes/${userID}/withdrawals`)
    );
    setWithdrawals(
      snatshop.docs.map((doc) => {
        const { weight, date, paid } = doc.data();
        return { weight, date, paid };
      })
    );
  }, []);

  return { withdrawals, getClientWithdrawals };
};

export default useWithdrawals;
