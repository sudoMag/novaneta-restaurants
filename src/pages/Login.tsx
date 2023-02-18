import { FormEvent, useState, useContext, ChangeEvent, MouseEvent } from "react";
import { Link, redirect } from "react-router-dom";
import styled from "styled-components";
import User from "../interfaces/User";
import useAuth from "../hooks/useAuth";
import { UserContext } from "../context/UserContext";

const Title = styled.img`
  margin: 0 40px 0;
  width: 150px;
`;

const Container = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

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
  border-radius: 8px;
  max-width: 300px;
  height: 20px;
  border: solid 3px black;
  background-color: #cfcfcf;
  text-align: center;

  &::placeholder {
    color: #383838;
    font-weight: bold;
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
  border-radius: 50px;
  border: 4px solid black;
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
    color: #3f15d6;
  }
`;

const InputsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailInput = styled(Input)``;

const PasswordInput = styled(Input)``;

const SendButton = styled.button`
  display: block;
  text-align: center;
  font-weight: bold;
  background-color: #3f15d6;
  color: white;
  padding: 0.8em 0.8em;
  line-height: 1;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 2px 2px 5px #00000036;
`;

const ImgCool = styled.img``;

const Login = ({ register }: { register?: boolean }) => {
  const { signIn, createNewUser } = useAuth();
  const {user} = useContext(UserContext);
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
    redirect("/cash");
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
      <Title src="navbaricon.svg" />
      <Container className="mobile-change orientation center-content">
        <ImgCool src="bob.jpg" />
        <Form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <h3>Ingresa</h3>
          <InputsContainer>
            <LeftContent>
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
            </LeftContent>
            <RightContent>
              {register ? (
                <Input
                  placeholder="Teléfono"
                  type="text"
                  name="phone"
                  onChange={onInputChangeHandler}
                />
              ) : null}
            </RightContent>
          </InputsContainer>
          <>
            <SendButton type="submit">Listo !</SendButton>
            <OptionsLink to="*">Olvidaste Tu Contraseña? 😱</OptionsLink>
          </>
        </Form>
      </Container>
    </>
  );
};

export default Login;
