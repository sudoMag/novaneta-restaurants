import {
  FormEvent,
  useState,
  useContext,
  ChangeEvent,
  MouseEvent,
} from "react";
import { Link, redirect } from "react-router-dom";
import styled from "styled-components";
import User from "../interfaces/User";
import useAuth from "../hooks/useAuth";
import { UserContext } from "../context/UserContext";
import { LeftContent, RightContent } from "../components/SplittedPanel";
import LogoNovaneta from "../icons/logoblack.svg";

const Container = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #100e0d;
  height: 100vh;
  overflow-y: hidden;

  & select {
    margin: 5px;
    border-radius: 8px;
    max-width: 300px;
    height: 30px;
    border: solid 3px black;
    text-align: center;
    background-color: black;
    color: white;
    font-weight: bold;
  }
`;

const Input = styled.input`
  margin: 5px;
  border-radius: 10px;
  max-width: 300px;
  height: 30px;
  background-color: #1d1e20;
  text-align: center;
  border: none;
  color: #a45b17;
  font-weight: bold;
  font-family: system-ui;
  border: 2px solid transparent;

  &::placeholder {
    color: #a45b17;
    font-weight: bold;
  }

  &:focus-visible {
    border: 2px solid #747474;
    outline: none;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 400px;
  width: 90vw;
  max-width: 500px;
  align-self: center;
  margin: 50px 0;
  padding: 30px 0;

  & h3 {
    color: var(--font-color);
  }

  & h5 {
    margin: 2px;
  }
`;

const OptionsLink = styled(Link)`
  color: var(--font-color);
  text-decoration: none;
  margin: 8px;
  transition-duration: 200ms;
  font-weight: bold;

  &:hover {
    color: black;
  }
`;

const InputsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const LeftFormContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightFormContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailInput = styled(Input)``;

const PasswordInput = styled(Input)``;

const SendButton = styled.button`
  width: 80%;
  margin: 10px 0;
  display: block;
  text-align: center;
  font-weight: bold;
  background-color: #1d1e20;
  color: #a45b17;
  font-family: system-ui;
  padding: 0.8em 0.8em;
  line-height: 1;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 2px 2px 5px #00000036;
`;

const ImgCool = styled.img`
  height: 100%;
`;

const NewLeftContent = styled(LeftContent)`
  width: 50%;
`;

const NewRightContent = styled(RightContent)`
  background-color: #a45b17;
`;

const Login = ({ register }: { register?: boolean }) => {
  const { signIn, createNewUser } = useAuth();
  const { user } = useContext(UserContext);
  const [inputData, setInputData] = useState<User>({
    name: "",
    email: "",
    password: "",
    commune: "",
    rut: "",
    phone: "",
    location: "",
    plan: "Pro",
  });

  if (user) {
    redirect("/panel/cash/select");
  }

  const onInputChangeHandler = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | MouseEvent<HTMLInputElement>
  ) => {
    setInputData({
      ...inputData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (register) {
      createNewUser(inputData);
    } else {
      signIn(inputData);
    }
  };

  return (
    <>
      <Container className="mobile-change orientation center-content">
        <NewLeftContent>
          <ImgCool src="ottercash.png" />
        </NewLeftContent>
        <NewRightContent>
          <img src={LogoNovaneta} alt="logo novaneta" />
          <Form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
            <h3>Ingresa</h3>
            <InputsContainer>
              <LeftFormContent>
                {register ? (
                  <>
                    <Input
                      placeholder="Nombre o Empresa"
                      name="name"
                      onChange={onInputChangeHandler}
                    />
                  </>
                ) : null}
                <EmailInput
                  placeholder="Email"
                  type="email"
                  name="email"
                  onChange={onInputChangeHandler}
                />
                <PasswordInput
                  placeholder="Contarseña"
                  type="password"
                  name="password"
                  onChange={onInputChangeHandler}
                />
              </LeftFormContent>
              <RightFormContent>
                {register ? (
                  <Input
                    placeholder="Teléfono"
                    type="text"
                    name="phone"
                    onChange={onInputChangeHandler}
                  />
                ) : null}
              </RightFormContent>
            </InputsContainer>
            <>
              <SendButton type="submit">INICIAR</SendButton>
              {register ? (
                <OptionsLink to="/login">Iniciar Seción</OptionsLink>
              ) : (
                <OptionsLink to="/register">Registrarse</OptionsLink>
              )}
              <OptionsLink to="*">Olvidaste Tu Contraseña? 😱</OptionsLink>
            </>
          </Form>
        </NewRightContent>
      </Container>
    </>
  );
};

export default Login;
