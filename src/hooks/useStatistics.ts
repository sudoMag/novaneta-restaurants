import {
  Timestamp,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase/configuration";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import Debt from "../utils/types/Debt";
import Balance from "../utils/types/Balance";

const useStatistics = () => {
  const { user } = useContext(UserContext);
  const [sales, setSales] = useState<Debt[]>([]);
  const [balanceAmount, setBalanceAmount] = useState<Balance[]>([]);
  const [lastDocInList, setLastDocInList] = useState<Debt>();

  const bringMoreSales = () => {
    const paidDate = new Date();

    const yearOfDate = paidDate.getFullYear();
    const monthOfDate = paidDate.getMonth() + 1;

    const q = query(
      collection(
        db,
        `Users/${user?.uid}/Balcance/
        ${yearOfDate}/${monthOfDate}/`
      ),
      orderBy("date", "desc"),
      startAfter(lastDocInList?.date),
      limit(8)
    );

    getDocs(q)
      .then((docs) => {
        let salesList: Debt[] = [];
        docs.forEach((doc) => {
          const data = doc.data();

          data.debts.forEach((sale: Debt) => {
            salesList.push(sale);
          });
          if (data.debts.length !== 0) {
            setSales([...sales, ...salesList]);
          } else {
            setSales([...sales]);
          }
          setLastDocInList(salesList[salesList.length - 1]);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const paidDate = new Date();

    const yearOfDate = paidDate.getFullYear();
    const monthOfDate = paidDate.getMonth() + 1;

    const q = query(
      collection(
        db,
        `Users/${user?.uid}/Balcance/
        ${yearOfDate}/${monthOfDate}/`
      ),
      orderBy("date", "desc"),
      limit(8)
    );

    const unSuscribe = onSnapshot(q, (docs) => {
      let salesList: Debt[] = [];

      docs.forEach((doc) => {
        const data = doc.data();

        data.debts.forEach((sale: Debt) => {
          salesList.push(sale);
        });
      });
      const lastDoc = salesList[salesList.length - 1];
      setLastDocInList(lastDoc);
      setSales(salesList);
    });

    return unSuscribe;
  }, [setLastDocInList, user?.uid]);

  useEffect(() => {
    const now = new Date();
    const startDay = new Date(now.setHours(0));
    /* const oneDay = 24 * 60 * 60 * 1000; */
    const yearOfDate = now.getFullYear();
    const monthOfDate = now.getMonth() + 1;

    const q = query(
      collection(
        db,
        `Users/${user?.uid}/Balcance/
        ${yearOfDate}/${monthOfDate}/`
      ),
      where("date", ">", Timestamp.fromDate(startDay)),
      where("date", "<=", Timestamp.fromDate(new Date(now.setHours(24)))),
      orderBy("date", "asc")
    );
    const unsubscribe = onSnapshot(
      q,
      (docs) => {
        let salesList: Balance[] = [];
        docs.forEach((item) => {
          const data = item.data();
          salesList.push({
            amount: data.amount,
            date: data.date,
            debts: data.debts,
          });
        });
        setBalanceAmount(salesList);
      },
      (error) => {
        console.error(error);
      }
    );
    return unsubscribe;
  }, [user?.uid]);

  return { balanceAmount, sales, bringMoreSales };
};

export default useStatistics;
