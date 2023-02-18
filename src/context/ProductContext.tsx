import {
  getDocs,
  collection,
  addDoc,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "../firebase/configuration";
import Product from "../interfaces/Product";
import { createContext, useState, useMemo, useRef, useContext } from "react";
import { UserContext } from "./UserContext";

interface IContext {
  Products: Product[];
  ProductsInfo: {
    get: () => Promise<void>;
    cancel: () => void;
  };
  onChangeProducts: Unsubscribe;
  addProduct: (product: Product) => void;
}

export const Context = createContext<IContext>({
  Products: [],
  ProductsInfo: { get: async () => {}, cancel: () => {} },
  onChangeProducts: () => {},
  addProduct: (product: Product) => {},
});

export const ProductsContext = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [Products, setProducts] = useState<Product[]>([]);
  const cancelled = useRef(false);
  const { user } = useContext(UserContext);

  const ProductsInfo = useMemo(
    () => ({
      get: async () => {
        cancelled.current = false;
        const plansSnapshot = await getDocs(
          collection(db, `Users/${user?.uid}/Products`)
        );
        const info = plansSnapshot.docs.map((product) => {
          const { name, description, price } = product.data();
          return { id: product.id, name, description, price };
        });
        if (!cancelled.current) {
          setProducts(info);
        }
      },
      cancel: () => {
        cancelled.current = true;
      },
    }),
    [user?.uid]
  );

  const onChangeProducts = useMemo(() => {
    console.log("funcion");
    const unsubscribe = onSnapshot(
      collection(db, `Users/${user?.uid}/Products`),
      (docs) => {
        let data: Product[] = [];
        docs.forEach((product) => {
          const { name, description, price } = product.data();
          data.push({ id: product.id, name, description, price });
        });
        console.log(data);
        setProducts(data);
      },
      (error) => {
        console.error(error);
      }
    );
  return () => unsubscribe();
  }, [user?.uid]);

  const addProduct = (product: Product) => {
    if (user) {
      addDoc(collection(db, `Users/${user?.uid}/Products`), product);
    }
  };

  return (
    <Context.Provider
      value={{ Products, ProductsInfo, onChangeProducts, addProduct }}
    >
      {children}
    </Context.Provider>
  );
};
