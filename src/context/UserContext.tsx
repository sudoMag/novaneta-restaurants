import { createContext, useEffect } from "react";
import { useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/configuration";
import useUserData from "../hooks/useUserData";
import { DocumentData } from "firebase/firestore/lite";

interface IContext {
  user: User | undefined | null;
  userData: DocumentData | undefined;
}

export const UserContext = createContext<IContext>({
  user: null,
  userData: undefined,
});

export const UserContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [user, setUser] = useState<User | undefined | null>(null);
  const { userData, getUserDataFromDB } = useUserData();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else if (!user) {
      setUser(undefined);
    }
  });

  useEffect(() => {
    if (user) {
      getUserDataFromDB(user.uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <UserContext.Provider value={{ user, userData }}>{children}</UserContext.Provider>
  );
};
