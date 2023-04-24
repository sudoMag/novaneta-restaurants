import {
  getDocs,
  collection,
  addDoc,
  onSnapshot,
  Unsubscribe,
  updateDoc,
  doc,
  query,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";
import { db, storage } from "../firebase/configuration";
import Product from "../utils/types/Product";
import {
  createContext,
  useState,
  useMemo,
  useRef,
  useContext,
  useCallback,
  ChangeEvent,
} from "react";
import { UserContext } from "./UserContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

interface IContext {
  Products: Product[];
  productImg: {
    url: undefined | string;
    progress: number;
  };
  ProductsInfo: {
    get: () => Promise<void>;
    cancel: () => void;
  };
  onChangeProducts: () => Unsubscribe;
  bringMoreProducts: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  upLoadProductImg: (e: ChangeEvent<HTMLInputElement>) => void;
  emptyImg: () => void;
  setImg: (img: string) => void;
}

export const Context = createContext<IContext>({
  Products: [],
  productImg: {
    url: undefined,
    progress: 0,
  },
  ProductsInfo: { get: async () => {}, cancel: () => {} },
  onChangeProducts: () => () => {},
  bringMoreProducts: () => {},
  addProduct: (product: Product) => {},
  updateProduct: (product: Product) => {},
  upLoadProductImg: (e: ChangeEvent<HTMLInputElement>) => {},
  emptyImg: () => {},
  setImg: (img: string) => {},
});

export const ProductsContext = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [Products, setProducts] = useState<Product[]>([]);
  const [lastProduct, setLastProduct] = useState<Product | null>(null);
  const cancelled = useRef(false);
  const { user } = useContext(UserContext);
  const [productImg, setProductImg] = useState<{
    url: undefined | string;
    progress: number;
  }>({
    url: undefined,
    progress: 0,
  });

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

  const onChangeProducts = useCallback(() => {
    const q = query(
      collection(db, `Users/${user?.uid}/Products`),
      orderBy("name", "asc"),
      limit(20)
    );

    const unsubscribe = onSnapshot(
      q,
      (docs) => {
        let data: Product[] = [];
        docs.forEach((product) => {
          const { name, description, price, img_url } = product.data();
          data.push({
            id: product.id,
            name,
            description,
            price,
            img_url: img_url ? img_url : "",
          });
        });
        console.log(data, data[data.length - 1]);
        setProducts(data);
        setLastProduct(data[data.length - 1]);
      },
      (error) => {
        console.error(error);
      }
    );
    return () => unsubscribe;
  }, [user?.uid]);

  const bringMoreProducts = () => {
    const q = query(
      collection(db, `Users/${user?.uid}/Products`),
      orderBy("name", "asc"),
      startAfter(lastProduct?.name),
      limit(20)
    );

    getDocs(q)
      .then((docs) => {
        let data: Product[] = [];
        docs.forEach((product) => {
          const { name, description, price, img_url } = product.data();
          data.push({
            id: product.id,
            name,
            description,
            price,
            img_url: img_url ? img_url : "",
          });
        });
        console.log(lastProduct, data);
        if (data.length !== 0) {
          console.log(data);
          setProducts([...Products, ...data]);
        } else {
          setProducts([...Products]);
        }
        setLastProduct(data[data.length - 1]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addProduct = (product: Product) => {
    if (user) {
      addDoc(collection(db, `Users/${user?.uid}/Products`), product);
    }
  };

  const updateProduct = (product: Product) => {
    if (user) {
      updateDoc(doc(db, `Users/${user?.uid}/Products/${product.id}`), {
        ...product,
      });
    }
  };

  const upLoadProductImg = (e: ChangeEvent<HTMLInputElement>) => {
    const img: FileList | null = e.currentTarget.files;

    if (img !== null) {
      const storageRef = ref(storage, `images/productImges/${img[0].name}`);

      const uploadTask = uploadBytesResumable(storageRef, img[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProductImg({
            ...productImg,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          });
        },
        (error) => {
          console.error(error);
        },
        () => {
          console.log("Upload complete");
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProductImg({
              ...productImg,
              url: downloadURL,
            });
          });
        }
      );
    }
  };

  const setImg = (img: string) => {
    setProductImg({
      ...productImg,
      url: img,
    });
  };

  const emptyImg = () => {
    setProductImg({
      url: undefined,
      progress: 0,
    });
  };

  return (
    <Context.Provider
      value={{
        Products,
        productImg,
        ProductsInfo,
        onChangeProducts,
        bringMoreProducts,
        addProduct,
        updateProduct,
        upLoadProductImg,
        emptyImg,
        setImg,
      }}
    >
      {children}
    </Context.Provider>
  );
};
