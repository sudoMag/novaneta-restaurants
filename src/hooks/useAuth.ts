import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/configuration";
import { setDoc, doc } from "firebase/firestore/lite";
import { db } from "../firebase/configuration";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import User from "../utils/types/User";

const useAuth = () => {
  const navigate = useNavigate();

  const signIn = (user: User) => {
    const { email, password } = user;
    signInWithEmailAndPassword(
      auth,
      email.toString(),
      password.toString()
    ).then((user) => {
      if (user) {
        navigate("/");
      }
    });
  };

  const createNewUser = async (user: User) => {
    const { email, password, phone, name } = user;
    console.log(email, password);

    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userData) => userData);

    const userID = userCredentials.user.uid;

    await setDoc(doc(db, "Users", userID), {
      name,
      email,
      phone,
    });
    console.log(userID);
    navigate("/");
  };

  return { signIn, createNewUser };
};

export default useAuth;
