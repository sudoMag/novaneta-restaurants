import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  createContext,
  useRef,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/configuration";
import CartToClient from "../utils/types/CartToClient";
import Debt from "../utils/types/Debt";
import Order from "../utils/types/Order";
import { CashContext } from "./CashContext";
import { DeviceContext } from "./DeviceContext";
import { KitchenContext } from "./KitchenContext";
import { UserContext } from "./UserContext";

interface Pay {
  totalToPay: number;
  debts: Debt[];
  debtsInView: Debt[];
  addDebt: (cart: CartToClient, order: Order) => void;
  successfulPayment: (typePayment: Debt["payType"]) => void;
  clients: DocumentData[];
  registNewClient: (client: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    rut: string;
  }) => void;
  findClient: {
    get: (clientRut: string) => Promise<void>;
    cancel: () => void;
  };
}

export const PayContext = createContext<Pay>({
  totalToPay: 0,
  debts: [],
  debtsInView: [],
  addDebt: (cart: CartToClient, order: Order) => {},
  successfulPayment: (typePayment: Debt["payType"]) => {},
  clients: [],
  registNewClient: (client: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    rut: string;
  }) => {},
  findClient: {
    get: async (clientRut: string) => {},
    cancel: () => {},
  },
});

export const PayContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [debtsInView, setDebtsInView] = useState<Debt[]>([]);
  const [clients, setClients] = useState<DocumentData[]>([]);
  const { user } = useContext(UserContext);
  const { thisDevice } = useContext(DeviceContext);
  const { ordersInView } = useContext(KitchenContext);
  const { cartId, cartToClient, selectedCart, deleteCart } =
    useContext(CashContext);
  const [totalToPay, setTotalToPay] = useState(0);
  const canceled = useRef(false);
  const Navigate = useNavigate();

  /**
   * Adds a new debt to the database based on the
   * specified cart and order.
   *
   * @param {CartToClient} cart - The cart associated
   * with the debt.
   * @param {Order} order - The order associated with
   * the debt.
   *
   * @returns void.
   */
  const addDebt = (cart: CartToClient, order: Order) => {
    if (thisDevice) {
      addDoc(collection(db, `Users/${user?.uid}/Payments`), {
        ...cart,
        amount: order.amount,
        products: order.products,
        itemsNumber: order.itemsNumber,
        status: "debt",
        casherId: thisDevice.id,
        date: Timestamp.now(),
        orderId: order.dbId,
      }).then((doc) => {
        return doc.id;
      });
    }
  };

  /**
   * Handles successful payment of debts using the
   * specified payment type.
   *
   * @param {Debt["payType"]} typePayment - The
   * payment type used to pay the debts.
   * @param {boolean} [deleteThisCart] - Whether to
   * delete the cart associated with the debts after
   * payment.
   *
   * @returns void
   */
  const successfulPayment = (
    typePayment: Debt["payType"],
    deleteThisCart?: boolean
  ) => {
    let totalAmount = 0;
    const paidDate = new Date();

    const yearOfDate = paidDate.getFullYear();
    const monthOfDate = paidDate.getMonth() + 1;
    const monthsNames = [
      "",
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Sepiembre",
      "Octiembre",
      "Noviembre",
      "Diciembre",
    ];

    debtsInView.forEach((debt) => {
      debt.payType = typePayment;
      debt.collectorId = thisDevice?.id;
      debt.paidDate = Timestamp.now();
      debt.status = "success";
      updateDoc(doc(db, `Users/${user?.uid}/Payments/${debt.thisDocId}`), {
        ...debt,
      });
      totalAmount += debt.amount;
    });
    addDoc(
      collection(
        db,
        `Users/${user?.uid}/Balcance/
        ${yearOfDate}/${monthOfDate}/`
      ),
      {
        date: Timestamp.now(),
        amount: balanceAmount + totalAmount,
        debts: debtsInView,
      }
    );
    setDoc(
      doc(
        db,
        `Users/${user?.uid}/Balcance/
        ${yearOfDate}/MonthsResume/${monthsNames[monthOfDate]}`
      ),
      {
        year: yearOfDate,
        monthNumber: monthOfDate,
        monthName: monthsNames[monthOfDate],
      }
    );
    setDoc(
      doc(
        db,
        `Users/${user?.uid}/Balcance/
        ${yearOfDate}`
      ),
      {
        year: yearOfDate,
      }
    );

    if (deleteThisCart) {
      setTimeout(() => deleteCart(debtsInView[0].dbId), 3000);
    }
    Navigate("cash/select");
  };

  const registNewClient = (client: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    rut: string;
  }) => {
    if (thisDevice) {
      addDoc(collection(db, `Users/${user?.uid}/Clients`), {
        ...client,
        casherId: thisDevice.id,
        date: Timestamp.now(),
      }).then((doc) => {
        return {
          id: doc.id,
        };
      });
    }
  };

  const findClient = useMemo(
    () => ({
      get: async (clientRut: string) => {
        canceled.current = false;
        const devicesSnapshot = await getDocs(
          query(
            collection(db, `Users/${user?.uid}/Clients`),
            where("rut", ">=", clientRut),
            limit(4)
          )
        );
        const info = devicesSnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        if (!canceled.current) {
          setClients(info);
        }
      },
      cancel: () => {
        canceled.current = true;
      },
    }),
    [user?.uid]
  );

  useEffect(() => {
    setDebtsInView([...debts.filter((item) => item.dbId === cartId)]);
  }, [cartId, debts]);

  useEffect(() => {
    let total = 0;
    if (selectedCart !== -1) {
      total = cartToClient[selectedCart].amount;
      ordersInView?.forEach((order) => {
        total += order.amount;
      });
      debtsInView?.forEach((debt) => {
        total += debt.amount;
      });
      setTotalToPay(total);
    }
  }, [cartToClient, debtsInView, ordersInView, selectedCart]);

  useEffect(() => {
    const q = query(
      collection(db, `Users/${user?.uid}/Balance`),
      orderBy("date", "asc"),
      limit(1)
    );
    const unsubscribe = onSnapshot(
      q,
      (docs) => {
        docs.forEach((item) => {
          const { amount } = item.data();
          setBalanceAmount(amount);
        });
      },
      (error) => {
        console.error(error);
      }
    );
    return unsubscribe;
  }, [user?.uid]);

  useEffect(() => {
    const q = query(
      collection(db, `Users/${user?.uid}/Payments`),
      where("status", "!=", "success"),
      orderBy("status", "asc"),
      orderBy("date", "asc")
    );
    const unsubscribe = onSnapshot(
      q,
      (docs) => {
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
        setDebts(data);
      },
      (error) => {
        console.error(error);
      }
    );
    return unsubscribe;
  }, [user?.uid]);

  return (
    <PayContext.Provider
      value={{
        totalToPay,
        debts,
        debtsInView,
        addDebt,
        successfulPayment,
        clients,
        registNewClient,
        findClient,
      }}
    >
      {children}
    </PayContext.Provider>
  );
};
