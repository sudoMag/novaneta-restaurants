import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
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
import { db } from "../firebase/configuration";
import CartToClient from "../interfaces/CartToClient";
import Debt from "../interfaces/Debt";
import Order from "../interfaces/Order";
import { CashContext } from "./CashContext";
import { DeviceContext } from "./DeviceContext";
import { KitchenContext } from "./KitchenContext";
import { UserContext } from "./UserContext";

interface Pay {
  totalToPay: number;
  debts: Debt[];
  debtsInView: Debt[];
  addDebt: (cart: CartToClient, order: Order) => void;
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
  const [debts, setDebts] = useState<Debt[]>([]);
  const [debtsInView, setDebtsInView] = useState<Debt[]>([]);
  const [clients, setClients] = useState<DocumentData[]>([]);
  const { user } = useContext(UserContext);
  const { thisDevice } = useContext(DeviceContext);
  const { ordersInView } = useContext(KitchenContext);
  const { cartId, cartToClient, selectedCart } = useContext(CashContext);
  const [totalToPay, setTotalToPay] = useState(0);
  const canceled = useRef(false);

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

  console.log(debts, debtsInView);

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
        clients,
        registNewClient,
        findClient,
      }}
    >
      {children}
    </PayContext.Provider>
  );
};
