import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/configuration";
import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { UserContext } from "./UserContext";
import Table from "../interfaces/Table";

interface IContext {
  tables: Table[];
  getTables: {
    get: () => Promise<void>;
    cancel: () => void;
  };
  addTable: (table: Table) => void;
}

export const TableContext = createContext<IContext>({
  tables: [],
  getTables: {
    get: async () => {},
    cancel: () => {},
  },
  addTable: (table: Table) => {},
});

export const TableContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { user } = useContext(UserContext);
  const cancelled = useRef(false);
  const [tables, setTables] = useState<Table[]>([]);

  const getTables = useMemo(
    () => ({
      get: async () => {
        cancelled.current = false;
        const tablesSnapshot = await getDocs(
          collection(db, `Users/${user?.uid}/Shop/Tables`)
        );
        const info = tablesSnapshot.docs.map((table) => {
          const { name, cart } = table.data();
          return { name, cart };
        });
        if (!cancelled.current) {
          setTables(info);
        }
      },
      cancel: () => {
        cancelled.current = true;
      },
    }),
    [user?.uid]
  );

  const addTable = (table: Table) => {
    if (user) {
      addDoc(collection(db, `Users/${user?.uid}/Shop/Tables`), table);
    }
  };

  return (
    <TableContext.Provider value={{ tables, getTables, addTable }}>
      {children}
    </TableContext.Provider>
  );
};
