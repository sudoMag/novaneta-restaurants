import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  limit,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { createContext, useRef, useState, useContext, useMemo } from "react";
import { db } from "../firebase/configuration";
import CartToClient from "../interfaces/CartToClient";
import Debt from "../interfaces/Debt";
import { DeviceContext } from "./DeviceContext";
import { UserContext } from "./UserContext";

interface Pay {
  debts: Debt[];
  addDebt: (cart: CartToClient, payType: string, clientId: string) => void;
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
  debts: [],
  addDebt: (cart: CartToClient, payType: string, clientId: string) => {},
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
  const [clients, setClients] = useState<DocumentData[]>([]);
  const { user } = useContext(UserContext);
  const { thisDevice } = useContext(DeviceContext);
  const canceled = useRef(false);

  const addDebt = (cart: CartToClient, payType: string, clientId: string) => {
    if (thisDevice) {
      addDoc(collection(db, `Users/${user?.uid}/Payments`), {
        ...cart,
        status: "debt",
        casherId: thisDevice.id,
        payType: payType,
        clientId: clientId,
        date: Timestamp,
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
          console.log(info)
          setClients(info);
        }
      },
      cancel: () => {
        canceled.current = true;
      },
    }),
    [user?.uid]
  );

  return (
    <PayContext.Provider
      value={{ debts, addDebt, clients, registNewClient, findClient }}
    >
      {children}
    </PayContext.Provider>
  );
};
