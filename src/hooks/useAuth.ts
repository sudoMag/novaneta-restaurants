import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/configuration";
import { setDoc, doc } from "firebase/firestore";
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
    console.log(email, password, phone, name);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userData) => userData)
      .then((userData) => {
        setDoc(doc(db, "Users", userData.user.uid), {
          name,
          email,
          phone,
        });
        console.log(userData.user.uid);
        navigate("/new-profile");
      });
  };

  return { signIn, createNewUser };
};

export default useAuth;
