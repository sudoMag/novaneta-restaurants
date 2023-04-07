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
import Debt from "../interfaces/Debt";
import Balance from "../interfaces/Balance";

const useStatistics = () => {
  const { user } = useContext(UserContext);
  const [sales, setSales] = useState<Debt[]>([]);
  const [balanceAmount, setBalanceAmount] = useState<Balance[]>([]);
  const [lastDocInList, setLastDocInList] = useState<Debt>();

  const bringMoreSales = () => {
    const q = query(
      collection(db, `Users/${user?.uid}/Payments`),
      where("status", "==", "success"),
      orderBy("thisDocId", "asc"),
      orderBy("paidDate", "desc"),
      startAfter(lastDocInList?.thisDocId),
      limit(8)
    );

    getDocs(q)
      .then((docs) => {
        let data: Debt[] = [];
        docs.forEach((item) => {
          const {
            dbId,
            id,
            name,
            type,
            products,
            itemsNumber,
            status,
            casherId,
            payType,
            date,
            orderId,
            amount,
          } = item.data();
          data.push({
            dbId,
            id,
            name,
            type,
            products,
            itemsNumber,
            status,
            casherId,
            payType,
            date,
            orderId,
            amount,
            thisDocId: item.id,
          });
        });
        if (data.length !== 0) {
          setSales([...sales, ...data]);
        } else {
          setSales([...sales]);
        }
        setLastDocInList(data[data.length - 1]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const q = query(
      collection(db, `Users/${user?.uid}/Payments`),
      where("status", "==", "success"),
      orderBy("paidDate", "desc"),
      limit(8)
    );

    const unSuscribe = onSnapshot(q, (docs) => {
      let data: Debt[] = [];
      docs.forEach((item) => {
        const {
          dbId,
          id,
          name,
          type,
          products,
          itemsNumber,
          status,
          casherId,
          payType,
          date,
          paidDate,
          orderId,
          amount,
        } = item.data();
        data.push({
          dbId,
          id,
          name,
          type,
          products,
          itemsNumber,
          status,
          casherId,
          payType,
          date,
          paidDate,
          orderId,
          amount,
          thisDocId: item.id,
        });
      });
      const lastDoc = data[data.length - 1];
      setLastDocInList(lastDoc);
      setSales(data);
    });

    return unSuscribe;
  }, [setLastDocInList, user?.uid]);

  useEffect(() => {
    const date = new Date();
    const today = date.getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    const q = query(
      collection(db, `Users/${user?.uid}/Balcance`),
      where("date", ">", Timestamp.fromDate(new Date(today - oneDay))),
      where("date", "<=", Timestamp.fromDate(date)),
      orderBy("date", "asc")
    );
    const unsubscribe = onSnapshot(
      q,
      (docs) => {
        let data: Balance[] = []
        docs.forEach((item) => {
          const { amount, date } = item.data();
          data.push({
            amount: amount,
            date: date,
          });
        });
        setBalanceAmount(data);
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
